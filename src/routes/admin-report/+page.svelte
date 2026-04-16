<script>
  import ReportForm from "$lib/ReportForm.svelte"
  import {
    Mail,
    MapPin,
    Phone,
    MailIcon,
    CheckCircle,
    User,
  } from "lucide-svelte"
  import Header from "$lib/AdminHeader.svelte"
</script>


<Header />


<div class="content-empty absolute top-0 left-0 w-full h-full bg-black/70 z-[100]" />

<div class="bg-black/75 flex px-2 py-8 gap-4 flex-col content-empty h-max absolute top-[25%] my-auto z-[102]">
  <CheckCircle class="text-green-700 mx-auto" size=50 />
  <h2 class=" text-white text-center">ONLINE REPORT SUCCESSFULLY FILED</h2>
    <a
    class="bg-green-700 shadow text-sm text-white font-bold px-5 py-3 w-full text-center rounded-full"
    href="/admin">
    RETURN TO CRIME MONITOR
  </a>
</div>

<div class="main-wrapper bg-cyan-900 flex flex-col gap-4 h-full p-4">
  <div
    class="bg-gray-300 rounded-lg shadow-xl overflow-hidden max-w-md w-full"
  >
    <p class="bg-black p-2 text-white">Suspicious Activity</p>

    <div class="bg-gray-300 px-2 py-1.5 flex flex-col gap-0.5">
      <p class="text-xs">
        Reported by <strong>Bryan Jacobs</strong> 12 mins ago
      </p>
      <hr class="border-gray-400" />
      <p class="text-xs flex items-center gap-1">
        <MapPin size="11" />
        James St S, district <strong>D1</strong>
      </p>
    </div>

    <div class="flex px-2 gap-2">
      <img
        class="flex-1 w-[50%]"
        src="https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/651652398_1654266868920011_4025603089388212308_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e06c5d&_nc_ohc=Y7RiJIOvHXYQ7kNvwEfIDWq&_nc_oc=AdrHnx1hWbr13pPxXtbMsVeWNgD0ulZUm24t7TViBrTa_1ZbK6hJ1mKtR3nOm8sm73yBeyD4gJRlg6cjba3SuZeE&_nc_zt=23&_nc_ht=scontent-yyz1-1.xx&_nc_gid=Biz5Usb-9oORlg4tYow_2A&_nc_ss=7a3a8&oh=00_Af1cxXzBgR-JQkIgdW-8aTauXvaP4Oe16TRLyDPTGsXBSQ&oe=69E60079"
        alt=""
      />
      <img
        class="flex-1 w-[50%]"
        src="https://scontent-yyz1-1.xx.fbcdn.net/v/t39.30808-6/652428961_1654266882253343_6482378018433280639_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e06c5d&_nc_ohc=sDSBRyiJFy8Q7kNvwFoWEkk&_nc_oc=AdpQoGL3_7Sb-DmPI0YBGDKttP5ZQy989k6IJwoTGWYUcKk7WTp1ItEvptm1xrMovpl2ivAGsyXdA6Nlh2VUIpOC&_nc_zt=23&_nc_ht=scontent-yyz1-1.xx&_nc_gid=82OyJLQKQ_1W5JFKKfoAMw&_nc_ss=7a3a8&oh=00_Af00P9I6r7we0sQjLLVqjeHSV-I0yOmB3jyD5mDwE6PDgg&oe=69E5FC62"
        alt=""
      />
    </div>

    <div class="bg-white/90 p-2 flex flex-col gap-1">
      <p class="text-xs">
        Spotted a suspicious man in a dark hoodie peering into parked cars near
        James St & Bold St
      </p>
      <p class="text-xs">
        The man was lingering around vehicles looking inside with his hood up. I
        was concerned he might be trying to break into them.
      </p>
    </div>

    <div class="bg-white/90 p-2 pt-0 flex flex-col gap-1">
      <p class="text-xs"><strong>Reporter Information:</strong></p>
      <p class="text-xs flex items-center gap-1">
        <User size="11" />
        Name: Bryan Jacobs
      </p>
      <p class="text-xs flex items-center gap-1">
        <Phone size="11" />
        Phone: (416) 555-3072
      </p>
      <p class="text-xs flex items-center gap-1">
        <Mail size="11" />
        Email: bjacobs123@gmail.com
      </p>
      <p class="text-xs flex items-center gap-1 text-green-700">
        <CheckCircle size="11" />
        Trusted Reporter
      </p>
    </div>
  </div>

</div>
