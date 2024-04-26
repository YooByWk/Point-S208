import { css } from '@emotion/react'

export const typographyMap = {
  t1: css`
    font-size: 68px;
    line-height: 76px;
  `,
  t2: css`
    font-size: 42px;
    line-height: 52px;
  `,
  t3: css`
    font-size: 32px;
    line-height: 40px;
  `,
  t4: css`
    font-size: 28px;
    line-height: 36px;
  `,
  t5: css`
    font-size: 24px;
    line-height: 32px;
  `,
  t6: css`
    font-size: 20px;
    line-height: 28px;
  `,
  t7: css`
    font-size: 18px;
    line-height: 24px;
  `,
  t8: css`
    font-size: 16px;
    line-height: 22px;
  `,
  t9: css`
    font-size: 14px;
    line-height: 20px;
  `,
  t10: css`
    font-size: 12px;
    line-height: 16px;
  `,
  t11: css`
    font-size: 10px;
    line-height: 14px;
  `,
}

export type Typography = keyof typeof typographyMap
