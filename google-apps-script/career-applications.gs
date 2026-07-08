/**
 * San City — Career applications + resume upload
 *
 * Sheet: https://docs.google.com/spreadsheets/d/19no2WM3t-1ATjRKfNXXf_0_9KKro6F9fb2yb_7Q2uzE/edit
 *
 * SETUP (one time):
 * 1. Open the sheet → Extensions → Apps Script
 * 2. Delete any old code, paste this entire file, Save
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Authorize when asked (Drive + Sheets access)
 * 5. Copy the Web app URL (ends with /exec)
 * 6. Paste it into GOOGLE_CAREER_APPS_SCRIPT_URL in Frontend/js/site-shell.js
 */
var CAREER_SHEET_ID = '19no2WM3t-1ATjRKfNXXf_0_9KKro6F9fb2yb_7Q2uzE';
var RESUME_FOLDER_NAME = 'San City Career Resumes';
var MAX_RESUME_BYTES = 5 * 1024 * 1024;
var ALLOWED_RESUME_EXT = /\.(pdf|doc|docx)$/i;

function doGet() {
  return jsonOutput({ ok: true, message: 'San City career endpoint ready' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({ ok: false, error: 'Invalid request' });
    }

    if (e.postData.contents.length > 8 * 1024 * 1024) {
      return jsonOutput({ ok: false, error: 'Payload too large' });
    }

    var data = JSON.parse(e.postData.contents);
    var resumeUrl = saveResumeToDrive(data);
    var sheet = SpreadsheetApp.openById(CAREER_SHEET_ID).getSheets()[0];

    sheet.appendRow([
      new Date(),
      sanitizeField_(data.firstName),
      sanitizeField_(data.lastName),
      sanitizeField_(data.email),
      sanitizeField_(data.phone),
      sanitizeField_(data.job),
      resumeUrl || '',
      sanitizeField_(data.about),
    ]);

    return jsonOutput({ ok: true, resumeUrl: resumeUrl || '' });
  } catch (err) {
    return jsonOutput({ ok: false, error: 'Submission failed' });
  }
}

function sanitizeField_(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .slice(0, 5000);
}

function saveResumeToDrive(data) {
  if (!data.resumeBase64 || !data.resumeName) return '';

  var resumeName = String(data.resumeName || '');
  if (!ALLOWED_RESUME_EXT.test(resumeName)) {
    throw new Error('Invalid resume type');
  }

  var bytes = Utilities.base64Decode(data.resumeBase64);
  if (!bytes || bytes.length > MAX_RESUME_BYTES) {
    throw new Error('Resume too large');
  }

  var folder = getOrCreateResumeFolder_();
  var mime = data.resumeMime || guessMime_(resumeName);
  if (!isAllowedResumeMime_(mime, resumeName)) {
    throw new Error('Invalid resume mime');
  }

  var safeName =
    sanitizeField_(data.firstName || 'Applicant') +
    '_' +
    sanitizeField_(data.lastName || '') +
    '_' +
    resumeName;
  safeName = safeName.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '_');

  var file = folder.createFile(Utilities.newBlob(bytes, mime, safeName));
  return file.getUrl();
}

function isAllowedResumeMime_(mime, name) {
  var allowed = {
    'application/pdf': true,
    'application/msword': true,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
  };
  if (allowed[mime]) return true;
  return ALLOWED_RESUME_EXT.test(name);
}

function getOrCreateResumeFolder_() {
  var folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(RESUME_FOLDER_NAME);
}

function guessMime_(name) {
  var lower = String(name || '').toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.doc')) return 'application/msword';
  if (lower.endsWith('.docx')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  return 'application/octet-stream';
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
