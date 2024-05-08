package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-09T00:11:04+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class BusinesscardMapperImpl implements BusinesscardMapper {

    @Override
    public Businesscard toEntity(CardRequest cardRequest) {
        if ( cardRequest == null ) {
            return null;
        }

        Businesscard.BusinesscardBuilder businesscard = Businesscard.builder();

        businesscard.name( cardRequest.name() );
        businesscard.company( cardRequest.company() );
        businesscard.position( cardRequest.position() );
        businesscard.rank( cardRequest.rank() );
        businesscard.department( cardRequest.department() );
        businesscard.email( cardRequest.email() );
        businesscard.landlineNumber( cardRequest.landlineNumber() );
        businesscard.faxNumber( cardRequest.faxNumber() );
        businesscard.phoneNumber( cardRequest.phoneNumber() );
        businesscard.address( cardRequest.address() );
        businesscard.realPicture( cardRequest.realPicture() );
        businesscard.frontBack( cardRequest.frontBack() );
        businesscard.domainUrl( cardRequest.domainUrl() );

        return businesscard.build();
    }

    @Override
    public CardRequest toDto(Businesscard businesscard) {
        if ( businesscard == null ) {
            return null;
        }

        String name = null;
        String company = null;
        String position = null;
        String rank = null;
        String department = null;
        String email = null;
        String landlineNumber = null;
        String faxNumber = null;
        String phoneNumber = null;
        String address = null;
        String realPicture = null;
        Businesscard.Status frontBack = null;
        String domainUrl = null;

        name = businesscard.getName();
        company = businesscard.getCompany();
        position = businesscard.getPosition();
        rank = businesscard.getRank();
        department = businesscard.getDepartment();
        email = businesscard.getEmail();
        landlineNumber = businesscard.getLandlineNumber();
        faxNumber = businesscard.getFaxNumber();
        phoneNumber = businesscard.getPhoneNumber();
        address = businesscard.getAddress();
        realPicture = businesscard.getRealPicture();
        frontBack = businesscard.getFrontBack();
        domainUrl = businesscard.getDomainUrl();

        CardRequest cardRequest = new CardRequest( name, company, position, rank, department, email, landlineNumber, faxNumber, phoneNumber, address, realPicture, frontBack, domainUrl );

        return cardRequest;
    }
}
