//
// StatusCodes.ts
// This file is used to define the status codes of the HTTP protocol.
// It has the class StatusCodes that has the status codes as static properties.
// @author Miguel > 2024-03-12
//
export class StatusCodes {
  static HTTP_100_CONTINUE: number = 100;
  static HTTP_101_SWITCHING_PROTOCOLS: number = 101;
  static HTTP_200_OK: number = 200;
  static HTTP_201_CREATED: number = 201;
  static HTTP_202_ACCEPTED: number = 202;
  static HTTP_203_NON_AUTHORITATIVE_INFORMATION: number = 203;
  static HTTP_204_NO_CONTENT: number = 204;
  static HTTP_205_RESET_CONTENT: number = 205;
  static HTTP_206_PARTIAL_CONTENT: number = 206;
  static HTTP_207_MULTI_STATUS: number = 207;
  static HTTP_208_ALREADY_REPORTED: number = 208;
  static HTTP_226_IM_USED: number = 226;
  static HTTP_300_MULTIPLE_CHOICES: number = 300;
  static HTTP_301_MOVED_PERMANENTLY: number = 301;
  static HTTP_302_FOUND: number = 302;
  static HTTP_303_SEE_OTHER: number = 303;
  static HTTP_304_NOT_MODIFIED: number = 304;
  static HTTP_305_USE_PROXY: number = 305;
  static HTTP_306_RESERVED: number = 306;
  static HTTP_307_TEMPORARY_REDIRECT: number = 307;
  static HTTP_308_PERMANENT_REDIRECT: number = 308;
  static HTTP_400_BAD_REQUEST: number = 400;
  static HTTP_401_UNAUTHORIZED: number = 401;
  static HTTP_402_PAYMENT_REQUIRED: number = 402;
  static HTTP_403_FORBIDDEN: number = 403;
  static HTTP_404_NOT_FOUND: number = 404;
  static HTTP_405_METHOD_NOT_ALLOWED: number = 405;
  static HTTP_406_NOT_ACCEPTABLE: number = 406;
  static HTTP_407_PROXY_AUTHENTICATION_REQUIRED: number = 407;
  static HTTP_408_REQUEST_TIMEOUT: number = 408;
  static HTTP_409_CONFLICT: number = 409;
  static HTTP_410_GONE: number = 410;
  static HTTP_411_LENGTH_REQUIRED: number = 411;
  static HTTP_412_PRECONDITION_FAILED: number = 412;
  static HTTP_413_REQUEST_ENTITY_TOO_LARGE: number = 413;
  static HTTP_414_REQUEST_URI_TOO_LONG: number = 414;
  static HTTP_415_UNSUPPORTED_MEDIA_TYPE: number = 415;
  static HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE: number = 416;
  static HTTP_417_EXPECTATION_FAILED: number = 417;
  static HTTP_422_UNPROCESSABLE_ENTITY: number = 422;
  static HTTP_423_LOCKED: number = 423;
  static HTTP_424_FAILED_DEPENDENCY: number = 424;
  static HTTP_426_UPGRADE_REQUIRED: number = 426;
  static HTTP_428_PRECONDITION_REQUIRED: number = 428;
  static HTTP_429_TOO_MANY_REQUESTS: number = 429;
  static HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE: number = 431;
  static HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS: number = 451;
  static HTTP_500_INTERNAL_SERVER_ERROR: number = 500;
  static HTTP_501_NOT_IMPLEMENTED: number = 501;
  static HTTP_502_BAD_GATEWAY: number = 502;
  static HTTP_503_SERVICE_UNAVAILABLE: number = 503;
  static HTTP_504_GATEWAY_TIMEOUT: number = 504;
  static HTTP_505_HTTP_VERSION_NOT_SUPPORTED: number = 505;
  static HTTP_506_VARIANT_ALSO_NEGOTIATES: number = 506;
  static HTTP_507_INSUFFICIENT_STORAGE: number = 507;
  static HTTP_508_LOOP_DETECTED: number = 508;
  static HTTP_509_BANDWIDTH_LIMIT_EXCEEDED: number = 509;
  static HTTP_510_NOT_EXTENDED: number = 510;
  static HTTP_511_NETWORK_AUTHENTICATION_REQUIRE: number = 511;
}
