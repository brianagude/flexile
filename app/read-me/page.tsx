export default function ReadMe() {
  return (
    <>
      <div className='bg-gray-light w-full p-4 md:p-6 lg:p-6 lg:px-16 border-b border-gray'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-2xl font-bold capitalize'>Read Me</h1>
          <p className='text-sm'>Time Tracking Feature (v1.0.0)</p>
        </div>
      </div>
      <div className='max-w-2xl p-4 md:p-6 lg:p-16'>
        <h2 className='text-2xl font-bold leading-tight mt-6'>Purpose and Impact</h2>
        <p className='mt-3 text-base leading-relaxed'>The time tracking feature was implemented to directly benefit Flexile users—both company founders and contractors—by enhancing accountability, improving billing accuracy, and streamlining workflow management.</p>

        <ol className='mt-4 list-decimal list-inside'>
          <li className='text-base leading-relaxed mb-3'><b>For Founders:</b> The feature provides precise, real-time data on resource allocation, enabling better project management and more accurate cash flow predictions. This aligns with Flexile&apos;s KPI of making dollar-backed decisions by ensuring that every hour worked is accounted for and invoiced correctly.</li>
          <li className='text-base leading-relaxed mb-3'><b>For Contractors:</b> Time tracking ensures contractors are paid accurately for every minute worked, fostering trust and transparency with clients. It saves time by eliminating the need for external tools.</li>
        </ol> 

        <h2 className='text-2xl font-bold leading-tight mt-6'>Using the Time Tracking Feature</h2>
        <p className='mt-3 text-base leading-relaxed'>To start tracking time on a task, simply select or create a task from the dropdown menu, and press the &quot;Start&quot; button. The timer will begin counting down, and you can monitor your progress. If you&apos;re using the Pomodoro timer, the &quot;Focus&quot; mode will help you concentrate on your work, and you can switch to &quot;Break&quot; mode when needed. Once your session is complete, the tracked time is automatically logged against the selected task for that day. You can view your tracked time in the weekly table, making it easy to manage your workload and ensure accurate time tracking for invoicing.</p>

        <h2 className='text-2xl font-bold leading-tight mt-6'>Technical Integration</h2>

        <ul className='mt-4 list-disc list-inside'>
          <li className='text-base leading-relaxed mb-3'><b>Time Tracker Components:</b> Both the regular and Pomodoro timers allow users to log their work in real-time. When a timer is paused, the time spent is immediately recorded and associated with the corresponding task.</li>
          <li className='text-base leading-relaxed mb-3'><b>Task Context:</b> This centralizes all task-related data, ensuring that each task is tracked with a unique ID. It stores time logs, updates task durations, and synchronizes with the time tracking table.</li>
          <li className='text-base leading-relaxed mb-3'><b>Time Tracking Table:</b> Displays a detailed log of time spent on tasks throughout the week. This table automatically updates as time is logged, providing contractors with a clear view of work progress and billing data.</li>
        </ul>

        <h2 className='text-2xl font-bold leading-tight mt-6'>Future Development</h2>
        <p className='mt-3 text-base leading-relaxed'>The data collected from this feature opens up opportunities for further enhancements, such as integrating with reporting tools to analyze productivity patterns, offering insights into project timelines, and identifying areas where efficiency can be improved.</p>
        <p className='mt-3 text-base leading-relaxed'>Additionally, this foundation can be expanded to include an automatic invoicing system, which would seamlessly generate invoices from tracked, uninvoiced time, further streamlining the billing process and enhancing operational efficiency.</p>
        <p className='mt-3 text-base leading-relaxed'>By leveraging the information gathered through this feature, Flexile can not only enhance user experience but also drive meaningful improvements to its bottom line and key performance indicators.</p>

        <h2 className='text-2xl font-bold leading-tight mt-6'>Links</h2>
        <ol className='mt-4 list-decimal list-inside'>
          <li className='mb-3'><a href='https://www.figma.com/design/OPepIDhRULv3VKIe2v6zh7/GUMROAD?node-id=0-1&t=b348DS7dBp2FSxjz-1' target="_blank" className='text-sm font-bold leading-tight hover:underline hover:text-blue'>Figma Link</a></li>
          <li className='mb-3'><a href='https://github.com/brianagude/flexile' target="_blank" className='text-sm font-bold leading-tight hover:underline hover:text-blue'>Github Repo</a></li>
          <li className='mb-3'><a href='https://www.brianagude.com' target="_blank" className='text-sm font-bold leading-tight hover:underline hover:text-blue'>My Portfolio</a></li>
        </ol>
      </div>
    </>
  );
}