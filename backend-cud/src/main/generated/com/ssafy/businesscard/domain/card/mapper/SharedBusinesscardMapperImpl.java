package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardSharedRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-09T00:11:04+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class SharedBusinesscardMapperImpl implements SharedBusinesscardMapper {

    @Override
    public Businesscard toEntity(CardSharedRequest cardSharedRequest) {
        if ( cardSharedRequest == null ) {
            return null;
        }

        Businesscard.BusinesscardBuilder businesscard = Businesscard.builder();

        return businesscard.build();
    }
}
