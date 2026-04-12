<script>
  import { ShieldAlert, Tent, Pill, TriangleAlert } from "lucide-svelte"
</script>

<div class="main-wrapper bg-cyan-900 h-full gap-2 flex flex-col">
  <div class="alert-header text-center bg-black">
    <h1 class="p-2 font-black text-yellow-500 flex gap-2 items-center justify-center">
    <TriangleAlert size={40} />
      WARNING
    </h1>
    <h2 class="p-2 bg-yellow-500 text-lg text-black font-black">POLICE SEARCH IN PROGRESS</h2>
  </div>
  <div class="p-2">
    <div class="shadow-xl rounded-lg overflow-clip">
      <p class="bg-black p-2 text-white">Suspicious Activity</p>
      <p class="bg-gray-300 px-2 py-1 text-xs">2 minutes ago • James St, S • District D1</p>
      <div class="bg-white bg-opacity-90 p-2 flex flex-col gap-2">
        <p class="text-sm">Currently wanted in the Hamilton area:</p>
        <p class="text-sm">Caucasion male, mid 30s, approximately 5'10 tall, thin build, dressed in a black hoodie, black pants, and a black mask covering the lower half of his face.</p>
      </div>
      <p class="text-center font-bold bg-gradient-to-r from-red-800 via-red-900 to-red-800 text-white text-sm tracking-[4px]">WANTED</p>
      <div class="flex">
        <img class="w-full flex-1" src="https://www.nydailynews.com/wp-content/uploads/migration/2023/03/29/BJ3EAJ3CWJD3RI4H644ONXPFZE.jpg?w=1200" alt="">
        <img class="w-full flex-1" src="https://www.nydailynews.com/wp-content/uploads/migration/2023/03/29/L5ACCPNMTZFJDNKZFKAFL3RWEQ.jpg?w=780" alt="">
      </div>
    </div>
  </div>
  <h2 class="text-yellow-500 text-lg text-center">CALL 911 IMMEDIATELY IF SEEN</h2>
    <a class="button warning-button w-max mx-auto" href="/">
      OK, GOT IT
    </a>
</div>
