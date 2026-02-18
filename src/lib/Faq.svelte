<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion/index.js'
</script>

<section class="content-block">
  <h2>Frequently asked questions</h2>

  <Accordion.Root class="w-full sm:max-w-[70%]">
    <Accordion.Item value="item-1">
      <Accordion.Trigger
        >Do you work with big or small companies?</Accordion.Trigger
      >
      <Accordion.Content
        >We work with businesses of all sizes! There is no task too big or too
        small. When you are starting out, its important to have a strong brand,
        and easy access to design assets when you need them. We also understand
        the importance of maintaining / refreshing a strong brand when you are
        already established.</Accordion.Content
      >
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>Can you guarantee results?</Accordion.Trigger>
      <Accordion.Content>
        We are a reliable and easy-to-use web development service. We stand
        behind the work we deliver and provide various guarantees, starting from
        risk-free trial runs, code quality guarantees, and life-time
        post-delivery support.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-4">
      <Accordion.Trigger>How will we communicate?</Accordion.Trigger>
      <Accordion.Content
        >Ideally we will use a job board such as Trello or Basecamp, but if you
        prefer to use something special we would be happy to try it out!
        Unfortunately we are no longer allowed to use messenger pigeons.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-5">
      <Accordion.Trigger>How can I pay for your services?</Accordion.Trigger>
      <Accordion.Content>
        We offer a range of payment options like all major credit cards, and
        Wise for international transfers. We use a reputable accounting software
        to process these transactions, ensuring your information stays safe.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-6">
      <Accordion.Trigger>What’s the average turnaround time?</Accordion.Trigger>
      <Accordion.Content>
        For a website, expect around a 30 day turnaround. Between planning,
        research, design, approvals, and development, we want to ensure
        everything goes smoothly. For Graphic Design, depending on the size of
        the project expect a 1-5 day turnaround, with daily check-ins.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</section>
