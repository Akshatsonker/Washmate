'use client';

const statusSteps = [
  { status: 'placed', label: 'Order Placed', icon: '📦' },
  { status: 'accepted', label: 'Accepted', icon: '✅' },
  { status: 'processing', label: 'Processing', icon: '⚙️' },
  { status: 'ready', label: 'Ready', icon: '🎉' },
  { status: 'delivered', label: 'Delivered', icon: '🏁' },
];
const getDeliveryDate = (pickupDate: string) => {
  const date = new Date(pickupDate);
  date.setDate(date.getDate() + 5);
  return date;
};
export function OrderTracker({ order }) {
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.status === order.status
  );

  const isRejected = order.status === 'rejected';

  // ✅ Progress width calculation
  const progressWidth =
    currentStepIndex >= 0
      ? (currentStepIndex / (statusSteps.length - 1)) * 100
      : 0;

  return (
    <div className="w-full">
      {isRejected ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-red-900">
            Order Rejected
          </h3>
          <p className="text-red-700 mt-2">
            This order was rejected by the vendor. You can create a new order.
          </p>
        </div>
      ) : (
        <div>

          {/* 🔥 NEW FIXED PROGRESS BAR */}
          <div className="relative mb-10">

            {/* Background line */}
            <div className="absolute top-7 left-0 right-0 h-1 bg-gray-200"></div>

            {/* Active progress line */}
            <div
              className="absolute top-7 left-0 h-1 bg-blue-500 transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            ></div>

            {/* Steps */}
            <div className="flex items-center justify-between relative z-10">
              {statusSteps.map((step, index) => (
                <div key={step.status} className="flex flex-col items-center flex-1">

                  {/* Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 transition-all ${
                      index <= currentStepIndex
                        ? 'bg-blue-500 text-white ring-4 ring-blue-200'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium text-center ${
                      index <= currentStepIndex
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>

                </div>
              ))}
            </div>
          </div>

          {/* Status Details */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {statusSteps[currentStepIndex]?.label || order.status}
                </h3>

                <p className="text-blue-700 mt-2">
                  {getStatusMessage(order.status)}
                </p>

                {order.deliveryDate && (
                  <p className="text-sm text-blue-600 mt-3">
  📅 Expected delivery:{' '}
  {(() => {
    const date = new Date(order.pickupDate);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString();
  })()}
</p>
                )}
              </div>

              <div className="text-4xl">
                {statusSteps[currentStepIndex]?.icon || '❓'}
              </div>
            </div>
          </div>

          {/* Timeline Info */}
          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Ordered</span>
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()} at{' '}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Pickup Date</span>
              <span className="font-medium text-gray-900">
                {new Date(order.pickupDate).toLocaleDateString()}
              </span>
            </div>

            {order.deliveryDate && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
  <span className="text-gray-600">Estimated Delivery</span>
  <span className="font-medium text-gray-900">
    {getDeliveryDate(order.pickupDate).toLocaleDateString()}
  </span>
</div>
            )}

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium text-gray-900">
                ${order.price.toFixed(2)}
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function getStatusMessage(status) {
  switch (status) {
    case 'placed':
      return 'Your order has been placed. Waiting for vendor confirmation.';
    case 'accepted':
      return 'Your order has been accepted! The vendor will pick up soon.';
    case 'processing':
      return 'Your laundry is being processed. We’re taking great care of it!';
    case 'ready':
      return 'Your order is ready for delivery! Check your messages for pickup details.';
    case 'delivered':
      return 'Your order has been delivered successfully. Thank you for using WashMate!';
    case 'rejected':
      return 'Your order was rejected. Please contact the vendor for more information.';
    default:
      return 'Your order status is being updated.';
  }
}