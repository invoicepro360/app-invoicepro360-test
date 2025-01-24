const APPTEXT = {
        MANUALLY_TXT    : 'manually', 
        PREVIEW_TXT     : 'Preview',
        VIEW_TXT        : 'View',
        PRINT_TXT       : 'Print',
        EXPORT_PDF_TXT  : 'Export as PDF',
        DELETE_TXT      : 'Delete',
        DUPLICATE_TXT   : 'Duplicate',     
        MORE_ACTION_BTN : 'More Action',
        STATUS_TXT      : 'Status',
        CUSTOMER_TXT    : 'Customer',
        DUE_DATE_TXT    : 'Due Date',
        INV_VIEW_TXT    : 'View Invoice',
        INV_EDIT_BTN    : 'Edit Invoice',
        INV_SEND_BTN    : 'Send Invoice',
        INV_RESEND_BTN  : 'Resend Invoice',
        INV_DRAFT_BTN   : 'Edit Draft',
        INV_APPROVE_DRAFT_TXT : 'Approve Draft', 
        CREATED_TXT     : 'Created',
        SEND_TXT        : 'Send',
        LAST_SEND_TXT   : 'Last Send',
        GET_PAID_TXT        : 'Get Paid',
        DUE_AMOUNT_TXT      : 'Due Amount',
        TOTAL_AMOUNT_TXT      : 'Total Amount',
        SEND_RECEIPT_BTN    : 'Send a receipt',
        SHARE_LINK_BTN      : 'Get Share Link',
        CHARGE_CARD_BTN     : 'Charge a credit card',
        RECORD_PAYMENT_BTN  : 'Tender',
        PAYMENT_RECEIVED_H1 : 'Payments',
        RECORD_PAYMENT_TXT  : 'Record a Payment',
        EDIT_PAYMENT_BTN    : 'Edit Payment',
        REMOVE_PAYMENT_BTN  : 'Remove Payment',
        TURN_ON_PAYMENT_H1: 'INVOICEPRO360 PAYMENTS',
        TURN_ON_PAYMENT_H2: 'Accept Online Payments',
        TURN_ON_PAYMENT_LINK: 'Turn on Payments',
        TURN_ON_PAYMENT_LI1: '<b>No surprise fees, ever.</b> No setup, monthly, or hidden fees',
        TURN_ON_PAYMENT_LI2: '<b>You\'re in control.</b> Customize payment methods on any invoice, and cancel anytime.',
        TURN_ON_PAYMENT_LI3: '<b>Flexible for your needs.</b> Receive individual or recurring automatic payments.',
        //estimate
        EST_VIEW_TXT    : 'View Estimate',
        EST_EDIT_BTN    : 'Edit Estimate',
        EST_SEND_BTN    : 'Send Estimate',
        EST_RESEND_BTN  : 'Resend Estimate',
        EST_DRAFT_BTN   : 'Edit Draft',
        EST_APPROVE_DRAFT_TXT : 'Approve Draft',
        EST_VALIDITY_DATE_TXT    : 'Validity Date',

}




const install = app => {
        app.config.globalProperties.$T = APPTEXT

};
      
export { install as default,APPTEXT as appText  };