package com.movemais.backend.dto;

public class PaymentResponseDTO {
    private String message;
    private boolean success;

    public PaymentResponseDTO(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }
}