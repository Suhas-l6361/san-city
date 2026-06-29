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

function doGet() {
  return jsonOutput({ ok: true, message: 'San City career endpoint ready' });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var resumeUrl = saveResumeToDrive(data);
    var sheet = SpreadsheetApp.openById(CAREER_SHEET_ID).getSheets()[0];

    // Match sheet columns: Timestamp | First | Last | Email | Phone | Job | Resume link | About
    sheet.appendRow([
      new Date(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.job || '',
      resumeUrl || '',
      data.about || '',
    ]);

    return jsonOutput({ ok: true, resumeUrl: resumeUrl || '' });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

function saveResumeToDrive(data) {
  if (!data.resumeBase64 || !data.resumeName) return '';

  var folder = getOrCreateResumeFolder_();
  var bytes = Utilities.base64Decode(data.resumeBase64);
  var mime = data.resumeMime || guessMime_(data.resumeName);
  var safeName =
    (data.firstName || 'Applicant') +
    '_' +
    (data.lastName || '') +
    '_' +
    data.resumeName;
  safeName = safeName.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '_');

  var file = folder.createFile(Utilities.newBlob(bytes, mime, safeName));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
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
