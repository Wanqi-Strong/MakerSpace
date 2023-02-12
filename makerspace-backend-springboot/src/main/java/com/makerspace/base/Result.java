package com.makerspace.base;

public class Result<T> {
    private int code;

    private String message = "success";

    private T data;

    public Result() {}

    public Result(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<T>();
        result.setCode(ResultCode.APP_SUCCESS.getCode());
        result.setMessage(ResultCode.APP_SUCCESS.getMessage());
        result.setData(data);
        return result;
    }

    public static <T> Result<T> error(int code, String message) {
        return new Result<T>(code, message);
    }

    public static <T> Result<T> error(String message) {
        return new Result<T>(ResultCode.APP_FAIL.getCode(), message);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

