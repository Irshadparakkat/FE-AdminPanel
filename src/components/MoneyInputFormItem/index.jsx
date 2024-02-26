import React from 'react';
import { Form, InputNumber } from 'antd';
import { useMoney } from '@/settings';

export default function MoneyInputFormItem({ onChange, value, readOnly = false, label, name, balance }) {
  const money = useMoney();

  const inputRules = [
    {
      type: 'number',
      message: 'Please enter a valid number',
    },
  ];

  const handleValueChange = (newValue) => {
    // Call the onChange prop with the new value
    onChange(newValue);
  };

  return (
    <Form.Item label={label} name={name} rules={inputRules}>
      <InputNumber
        readOnly={readOnly}
        className="moneyInput"
        value={value}
        controls={false}
        addonAfter={money.currencyPosition === 'after' ? '₹' : undefined}
        addonBefore={money.currencyPosition === 'before' ? '₹' : undefined}
        formatter={(value) => money.amountFormatter({ amount: value })}
        onChange={handleValueChange}
      />
      {name === 'intPayableAmt' && (
        <Form.Item name="intPayableAmt"  hidden>
          <InputNumber value={value}/>
        </Form.Item>
      )}
      {name === 'intPaidAmt' && (
        <Form.Item name="intPaidAmt"  hidden>
          <InputNumber value={value} />
        </Form.Item>
      )}
      {name === 'intBalanceAmt' && (
        <Form.Item name="intBalanceAmt" hidden>
          <InputNumber value={value} />
        </Form.Item>
      )}
       {name === 'intTotalPayAmt' && (
        <Form.Item name="intTotalPayAmt" hidden>
          <InputNumber value={value} />
        </Form.Item>
      )}{name === 'intTotalAmt' && (
        <Form.Item name="intTotalAmt" hidden>
          <InputNumber value={value} />
        </Form.Item>
      )}
    </Form.Item>
  );
}
