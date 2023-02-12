package com.makerspace.base;

public enum ResultCode {

    // general HTTP status
    SUCCESS(200,"OK"),
    FAIL(400,"Bad Request"),
    UNAUTHORIZED(401,"Unauthorized"),
    FORBIDDEN(401,"Forbidden"),
    NOT_FOUND(404,"Not Found"),
    INTERNAL_SERVER_ERROR(500,"Internal Server Error"),
    SERVICE_UNAVAILABLE(503,"Service Unavailable"),
    // service status
    APP_SUCCESS(1,"Success"),
    APP_FAIL(-1,"Fail");

    private int code;
    private String message;

    ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}

