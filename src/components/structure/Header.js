export const RenderHeader = () => {

     return (
          <div className="header">
               <div className="logo">
                    <img onClick={ () => { window.location.href="https://www.youtube.com/@kodiecode"} } src="/finance-tracker-logo.jpg" alt="Kodie"/>
               </div>
               <h1>Financial Tracker Application</h1>
          </div>
     )
}