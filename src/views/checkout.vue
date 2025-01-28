<template>
  <div class="min-h-screen flex flex-col items-center py-10 bg-gray-50">
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-3xl font-semibold text-gray-800">Checkout</h2>
      <p class="mt-4 text-gray-700">
        You selected <strong>{{ packageName }}</strong> for <strong>${{ packagePrice }}</strong>.
      </p>
      <button class="mt-8 bg-blue-500 text-white py-3 px-6 w-full rounded-lg" @click="openModal">
        Pay Now
      </button>
    </div>

    <!-- Payment Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Enter Card Details</h3>
        <form @submit.prevent="processPayment">
          <input v-model="cardNumber" placeholder="Card Number" class="w-full mb-4 p-2 border" required />
          <input v-model="expiryDate" placeholder="Expiry Date" class="w-full mb-4 p-2 border" required />
          <input v-model="cvv" placeholder="CVV" class="w-full mb-4 p-2 border" required />
          
          <!-- Buttons in a row -->
          <div class="flex gap-4">
            <button type="submit" class="bg-blue-500 text-white w-full py-2 rounded-lg">Pay Now</button>
            <button type="button" class="bg-red-500 text-white w-full py-2 rounded-lg" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="isPaymentSuccess" class="fixed inset-0 bg-green-500 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg w-96 text-center">
        <h3 class="text-xl font-semibold mb-4 text-green-600">Payment Successful!</h3>
        <p>You have successfully purchased <strong>{{ packageName }}</strong>.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCheckout } from "@/compositions/checkout";

export default {
  setup() {
    const {
      packageName,
      packagePrice,
      isModalOpen,
      isPaymentSuccess,
      cardNumber,
      expiryDate,
      cvv,
      openModal,
      closeModal,
      processPayment,
    } = useCheckout();
    return {
      packageName,
      packagePrice,
      isModalOpen,
      isPaymentSuccess,
      cardNumber,
      expiryDate,
      cvv,
      openModal,
      closeModal,
      processPayment,
    };
  },
};
</script>
