document.getElementById('orderType').addEventListener('change', function () {
  const label = document.getElementById('addressLabel');
  label.style.display = (this.value === 'delivery') ? 'block' : 'none';
});

function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !phone) {
    alert('Please enter Name and Mobile No.');
    return;
  }
  const qtyInputs = document.querySelectorAll('.qty');
  let items = [];
  let total = 0;
  qtyInputs.forEach(input => {
    const qty = parseInt(input.value) || 0;
    if (qty > 0) {
      const price = parseInt(input.getAttribute('data-price'));
      const itemName = input.getAttribute('data-name');
      const itemTotal = qty * price;
      total += itemTotal;
      items.push(itemName + ' x ' + qty + ' = ₹' + itemTotal);
    }
  });
  if (items.length === 0) {
    alert('Please select at least one item.');
    return;
  }
  const orderType = document.getElementById('orderType').value;
  const address = document.getElementById('address').value.trim();
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value.trim();

  // WhatsApp message content
  let message = `*Chakravarthi cool drinks & Tiffin Shop - New Order*\n`;
  message += `*Name:* ${name}\n*Mobile:* ${phone}\n*Order Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Takeaway'}\n`;
  if (orderType === 'delivery' && address) message += `*Address:* ${address}\n`;
  if (time) message += `*Preferred Time:* ${time}\n`;
  message += `*Order Items:*\n`;
  items.forEach(i => { message += `- ${i}\n`; });
  message += `*Total:* ₹${total}\n`;
  if (notes) message += `*Notes:* ${notes}\n`;

  const whatsAppNumber = '918555805374';
  const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
