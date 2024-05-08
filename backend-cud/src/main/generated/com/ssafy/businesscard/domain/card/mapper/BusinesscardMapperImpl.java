package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T21:08:04+0900",
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

        businesscard.cardId( cardRequest.cardId() );
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
}
