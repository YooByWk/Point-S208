package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.card.entity.Filter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T21:08:04+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class FilterMapperImpl implements FilterMapper {

    @Override
    public Filter toEntity(FilterRequest filterRequest) {
        if ( filterRequest == null ) {
            return null;
        }

        Filter.FilterBuilder filter = Filter.builder();

        filter.filterName( filterRequest.filterName() );

        return filter.build();
    }
}
