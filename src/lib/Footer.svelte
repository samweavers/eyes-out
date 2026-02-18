<script>
  import logo from '$lib/assets/logo-square-pink.svg'
</script>

<footer class="border-t">
  <div
    class="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4"
  >
    <a href="/" class="w-[60px]"><img alt="The project logo" src={logo} /></a>
    <!-- <div class="flex gap-8 text-lg">
      <a href="/terms/" class="hover:underline">Terms</a>
      <a href="/privacy/" class="hover:underline">Privacy</a>
      <a href="/contact/" class="hover:underline">Contact</a>
    </div> -->
    <p class="text-lg text-center md:text-right">
      &copy; {new Date().getFullYear()} Tiny Teeth. All rights reserved.
    </p>
  </div>
</footer>
