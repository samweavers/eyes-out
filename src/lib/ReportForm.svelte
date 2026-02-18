<script>
  let name = '';
  let email = '';
  let phone = '';
  let type = '';
  let date = '';
  let description = '';

  const handleSubmit = (event) => {
    event.preventDefault();

    // Example: log the form data or send to your API
    const formData = { name, email, phone, type, date, description };
    console.log('Crime report submitted:', formData);

    // Reset form
    name = '';
    email = '';
    phone = '';
    type = '';
    date = '';
    description = '';

    alert('Your report has been submitted.');
  };
</script>

<form on:submit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
  <h2 class="text-2xl font-bold text-center">Crime Report Form</h2>

  <!-- Reporter Info -->
  <div>
    <label for="name" class="block font-medium">Your Name</label>
    <input id="name" bind:value={name} type="text" required placeholder="John Doe"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </div>

  <div>
    <label for="email" class="block font-medium">Email</label>
    <input id="email" bind:value={email} type="email" placeholder="john@example.com"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </div>

  <div>
    <label for="phone" class="block font-medium">Phone Number</label>
    <input id="phone" bind:value={phone} type="tel" placeholder="(123) 456-7890"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </div>

  <!-- Crime Details -->
  <div>
    <label for="type" class="block font-medium">Type of Crime</label>
    <select id="type" bind:value={type} required
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option value="">Select one</option>
      <option value="theft">Theft</option>
      <option value="assault">Assault</option>
      <option value="vandalism">Vandalism</option>
      <option value="fraud">Fraud</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div>
    <label for="date" class="block font-medium">Date of Incident</label>
    <input id="date" bind:value={date} type="date" required
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
  </div>

  <div>
    <label for="description" class="block font-medium">Description</label>
    <textarea id="description" bind:value={description} rows="4" placeholder="Provide details..."
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
  </div>

  <button type="submit"
    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition">
    Submit Report
  </button>
</form>
