import { notFound } from "next/navigation"

const dynamicParams = true

export async function generateStaticParams(){
    const res = await fetch("http://localhost:4000/tickets")

   const tickets = await res.json()
   
   return tickets.map((ticket) =>({
    id: ticket.id
   }))
}

async function getTicket (paramsId) {
    await new Promise(resolve => setTimeout(resolve,5000))

    const res = await fetch(`http://localhost:4000/tickets/${paramsId}`,
    {
        next:{
            revalidate: 0
        }
    })

    if(!
        res.ok){
        notFound()
    }


    return res.json()
}


export default async function TicketDetails({params}) {
    const paramsId = params.id

    const ticket = await getTicket(paramsId)
  return (
    <div>
        <nav>
            <h2>Ticket Details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created By {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority 
            </div>
        </div>
    </div>
  )
}
