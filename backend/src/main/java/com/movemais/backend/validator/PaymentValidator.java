package com.movemais.backend.validator;

import java.time.Year;
import java.util.regex.Pattern;

public class PaymentValidator {
    public static boolean isCpfValid(String cpf) {
        cpf = cpf.replaceAll("[^\\d]", "");

        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) return false;

        try {
            int d1 = 0, d2 = 0;
            for (int i = 0; i < 9; i++) {
                int digit = cpf.charAt(i) - '0';
                d1 += digit * (10 - i);
                d2 += digit * (11 - i);
            }
            int check1 = (d1 * 10) % 11;
            check1 = (check1 == 10) ? 0 : check1;
            d2 += check1 * 2;
            int check2 = (d2 * 10) % 11;
            check2 = (check2 == 10) ? 0 : check2;
            return check1 == (cpf.charAt(9) - '0') && check2 == (cpf.charAt(10) - '0');
        } catch (Exception e) {
            return false;
        }
    }

    public static boolean isAdult(int birthYear) {
        int currentYear = Year.now().getValue();
        return currentYear - birthYear >= 18;
    }

    public static boolean isExpirationValid(String expirationDate) {
        if (!Pattern.matches("\\d{2}/\\d{2}", expirationDate)) return false;

        int month = Integer.parseInt(expirationDate.substring(0, 2));
        int year = Integer.parseInt("20" + expirationDate.substring(3));

        if (month < 1 || month > 12) return false;

        Year current = Year.now();
        int currentYear = current.getValue();

        return year > currentYear || (year == currentYear && month >= java.time.LocalDate.now().getMonthValue());
    }

    public static String detectCardBrand(String cardNumber) {
        if (cardNumber.startsWith("4")) {
            return "Visa";
        } else if (cardNumber.matches("^5[1-5].*")) {
            return "MasterCard";
        } else {
            return "Desconhecida";
        }
    }

    public static String maskCard(String cardNumber) {
        if (cardNumber.length() < 4) return "****";
        return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
    }
}