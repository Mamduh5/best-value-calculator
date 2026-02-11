function success(res, data = null, message = "Success", code = "SUCCESS") {
  return res.status(200).json({
    ok: true,
    code,
    message,
    data,
  });
}

function error(res, status = 400, message = "Error", code = "ERROR") {
  return res.status(status).json({
    ok: false,
    code,
    message,
    data: null,
  });
}

module.exports = {
  success,
  error,
};
