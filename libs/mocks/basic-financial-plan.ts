export const BASIC_FINANCIAL_PLAN_UI_MOCK = [
    {
        state: {

            id:           123456,
            folio:        'sadv-asdasf-fasfas',
            type:         'COMMISSION',
            comments:     'ANY',
            status:       'PENDING_APPROVAL',
            effectivenessDate: '2022-12-01',
            observations: null,
            summary: {     
                termDays:       12,
                negotiatedRate: {
                    baseType:        {
                        code:        'IBR',
                        description: 'IBR'
                    },
                    specialRate:     10,
                    periodicityType: {
                        code:        'IBR',
                        description: 'IBR'
                    },
                }
            }
        }
    },
    {
        state: {

            id:           1234567,
            folio:        'sadv-asdasf-fasfas',
            type:         'FINANCED',
            comments:     'ANY',
            status:       'CURRENT',
            effectivenessDate: '2022-12-01',
            observations: null,
            summary: {     
                termDays:       10,
                negotiatedRate: {
                    baseType:        {
                        code:        'IBR',
                        description: 'IBR'
                    },
                    specialRate:     1,
                    periodicityType: {
                        code:        'IBR',
                        description: 'IBR'
                    },
                }
            }
        }
    }
]