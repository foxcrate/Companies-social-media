let errors = new Map();
let enErrors = new Map();
let arErrors = new Map();

errors.set("en", enErrors);
errors.set("ar", arErrors);

enErrors
  .set("WELCOME", "Welcome")
  .set("REPEATED_EMAIL", "Email already exist")
  .set("REPEATED_NAME", "Name already exist")
  .set("EMAIL_NOT_FOUND", "Email not found")
  .set("WRONG_PASSWORD", "Password not correct")
  .set("MISSING_EMAIL", "No email is provided")
  .set("CITIZEN_NOT_FOUND", "Citizen not found")
  .set("APPLICANT_NOT_FOUND", "Applicant not found")
  .set("ADMIN_NOT_FOUND", "Admin not found")
  .set("EVALUATOR_NOT_FOUND", "Evaluator not found")
  .set("UNABLE_TO_SEND_EMAIL", "Error in sending the email")
  .set("NO_BEARER_TOKEN", "Authorization Bearer token should be provided")
  .set("JWT_ERROR", "Invalid bearer token")
  .set("STARTUP_NOT_FOUND", "Startup not found")
  .set("WRONG_JWT_ERROR", "wrong bearer token")
  .set("UNAVAILABLE_PAGE", "page number isn't correct")
  .set("SERVER_ERROR", "Server problem, will be fixed soon");

arErrors
  .set("WELCOME", "مرحبا")
  .set("REPEATED_EMAIL", "الإيميل مسجل مسبقا")
  .set("REPEATED_NAME", "الإسم مستخدم مسبقا")
  .set("EMAIL_NOT_FOUND", "الايميل غير موجود")
  .set("WRONG_PASSWORD", "كلم المرور غير صحيحة")
  .set("MISSING_EMAIL", "لا يوجد بريد إلكتورني")
  .set("CITIZEN_NOT_FOUND", "هذا المستخدم العادي غير مسجل")
  .set("APPLICANT_NOT_FOUND", "هذا المتقدم بالأفكار غير مسجل")
  .set("ADMIN_NOT_FOUND", "هذا الأدمن غير مسجل")
  .set("EVALUATOR_NOT_FOUND", "هذا المقيم غير مسجل")
  .set("UNABLE_TO_SEND_EMAIL", "حدث عطل في إرسال الايميل")
  .set("NO_BEARER_TOKEN", "Authorization Bearer token should be provided")
  .set("JWT_ERROR", "Invalid bearer token")
  .set("STARTUP_NOT_FOUND", "الشركة غير موجودة")
  .set("WRONG_JWT_ERROR", "wrong bearer token")
  .set("UNAVAILABLE_PAGE", "رقم الصفحة غير صحيح")
  .set("SERVER_ERROR", "حدث مشكلة في السيرفر، سوف تحل قريبا");

module.exports = errors;
