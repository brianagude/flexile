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
      <p>An automatic invoicing feature could be built on this foundation, further reducing administrative overhead by generating invoices directly from tracked time that hasn't been invoiced yet.</p>
      <p>In summary, this time tracking feature not only improves operational efficiency for Flexile users but also strengthens Flexile&apos;s core KPIs by ensuring accurate billing and optimal resource management.</p>

      <h3>Links</h3>
      <ol>
        <li><a href='https://www.figma.com/design/OPepIDhRULv3VKIe2v6zh7/GUMROAD?node-id=0-1&t=b348DS7dBp2FSxjz-1'target="_blank">Figma Link</a></li>
        <li><a href='https://github.com/brianagude/flexile' target="_blank">Github Repo</a></li>
        <li><a href='https://www.brianagude.com' target="_blank">My Portfolio</a></li>
      </ol>
    </div>
    </>
  );
}