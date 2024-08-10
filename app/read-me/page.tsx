import "@/styles/pages/read-me.scss";

export default function ReadMe() {
  return (
    <>
    <div className='page-header'>
      <div className='container'>
        <h1>Read Me</h1>
        <p>Time Tracking Feature (v1.0.0)</p>
      </div>
    </div>
    <div className='page-wrapper'>
      <h2>Purpose and Impact</h2>
      <p>The time tracking feature was implemented to directly benefit Flexile users—both company founders and contractors—by enhancing accountability, improving billing accuracy, and streamlining workflow management.</p>

      <ol>
        <li><b>For Founders:</b> The feature provides precise, real-time data on resource allocation, enabling better project management and more accurate cash flow predictions. This aligns with Flexile&apos;s KPI of making dollar-backed decisions by ensuring that every hour worked is accounted for and invoiced correctly.</li>
        <li><b>For Contractors:</b> Time tracking ensures contractors are paid accurately for every minute worked, fostering trust and transparency with clients. It saves time by eliminating the need for external tools.</li>
      </ol> 

      <h2>Technical Integration</h2>

      <ul>
        <li><b>Time Tracker Components:</b> Both the regular and Pomodoro timers allow users to log their work in real-time. When a timer is paused, the time spent is immediately recorded and associated with the corresponding task.</li>
        <li><b>Task Context:</b> This centralizes all task-related data, ensuring that each task is tracked with a unique ID. It stores time logs, updates task durations, and synchronizes with the time tracking table.</li>
        <li><b>Time Tracking Table:</b> Displays a detailed log of time spent on tasks throughout the week. This table automatically updates as time is logged, providing contractors with a clear view of work progress and billing data.</li>
      </ul>

      <h2>Future Development</h2>
      <p>The data collected from this feature opens up opportunities for further enhancements, such as integrating with reporting tools to analyze productivity patterns, offering insights into project timelines, and identifying areas where efficiency can be improved.</p><p>Additionally, this foundation can be expanded to include an automatic invoicing system, which would seamlessly generate invoices from tracked, uninvoiced time, further streamlining the billing process and enhancing operational efficiency.</p>
      <p>By leveraging the information gathered through this feature, Flexile can not only enhance user experience but also drive meaningful improvements to its bottom line and key performance indicators.</p>

      <h2>Links</h2>
      <ol>
        <li><a href='https://www.figma.com/design/OPepIDhRULv3VKIe2v6zh7/GUMROAD?node-id=0-1&t=b348DS7dBp2FSxjz-1'target="_blank">Figma Link</a></li>
        <li><a href='https://github.com/brianagude/flexile' target="_blank">Github Repo</a></li>
        <li><a href='https://www.brianagude.com' target="_blank">My Portfolio</a></li>
      </ol>
    </div>
    </>
  );
}