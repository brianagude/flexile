const generateInvoice = (logs) => {
  const invoiceItems = logs.map(log => ({
    task: log.task,
    duration: log.time / 3600, // converting seconds to hours
    rate: 50, // example rate
    cost: (log.time / 3600) * 50
  }));

  const totalCost = invoiceItems.reduce((total, item) => total + item.cost, 0);

  return {
    items: invoiceItems,
    total: totalCost
  };
};

const Invoice = ({ logs }) => {
  const invoice = generateInvoice(logs);

  return (
    <div>
      <h3>Invoice</h3>
      {invoice.items.map((item, index) => (
        <div key={index}>
          {item.task} - {item.duration} hrs @ ${item.rate}/hr: ${item.cost}
        </div>
      ))}
      <div>Total: ${invoice.total}</div>
    </div>
  );
};

export default Invoice;