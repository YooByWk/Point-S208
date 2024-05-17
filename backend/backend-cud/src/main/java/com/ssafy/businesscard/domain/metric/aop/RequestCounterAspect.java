package com.ssafy.businesscard.domain.metric.aop;

import io.prometheus.client.Counter;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class RequestCounterAspect {

    private static final Counter httpRequestsTotal = Counter.build()
            .name("http_requests_total")
            .help("Total number of HTTP requests")
            .register();


    @Before("execution(* com.ssafy.businesscard.domain.*.controller.*.*(..))")
    public void incrementRequestCounter() {
        httpRequestsTotal.inc();
    }

}
