var authorizationToken = '';
$.ajax({
  type: "get",
  url: "http://localhost:80/colaborador/listarColaboradores",
  // processData: false,
  beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2xhYm9yYWRvciI6IjVhN2I2OGQwODI3MWU4OGYzYWNhNWNjYSIsImlhdCI6MTUxODIxNjM2N30.mFpVYJXRTcFc-hEACYna2zRGDGZpuhgfgTzx8brJmgo");
  },
  success: function (msg) {
    console.log(msg);
  }
});