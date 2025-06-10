package com.movemais.backend.service;

import org.springframework.stereotype.Service;
import com.movemais.backend.dto.PaymentRequestDTO;
import com.movemais.backend.dto.PaymentResponseDTO;
import com.movemais.backend.validator.PaymentValidator;

@Service
public class PaymentService {
    public PaymentResponseDTO processPayment(PaymentRequestDTO request) {
        String rawCpf = request.getCpf().replaceAll("[^\\d]", "");
        String rawCard = request.getCardNumber().replaceAll("[^\\d]", "");

        if (!PaymentValidator.isCpfValid(rawCpf)) {
            return new PaymentResponseDTO("CPF inválido.", false);
        }

        if (!PaymentValidator.isAdult(request.getBirthYear())) {
            return new PaymentResponseDTO("É necessário ter no mínimo 18 anos.", false);
        }

        if (!PaymentValidator.isExpirationValid(request.getExpirationDate())) {
            return new PaymentResponseDTO("Cartão expirado ou data inválida.", false);
        }

        String bandeira = PaymentValidator.detectCardBrand(rawCard);

        // Sucesso fictício (sem salvar nada)
        String msg = String.format("Pagamento aprovado. Cartão %s (%s).", 
                                   PaymentValidator.maskCard(rawCard), bandeira);

        return new PaymentResponseDTO(msg, true);
    }
}