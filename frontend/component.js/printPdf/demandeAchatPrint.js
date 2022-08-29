//pdf
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const getMeTableItem = (items)=> {
  const table = []

  for(let i=0; i<items.length; i++) {
    const itemsTable1d = []
    itemsTable1d.push(items[i].id)
    itemsTable1d.push(items[i].name)
    itemsTable1d.push(items[i].quantity)
    table.push(itemsTable1d)
  }
  return table
}
export const generateDemandeAchatPdf = (demande, items) => {
  var doc = new jsPDF('portrait', 'px', 'a4', 'false')
  //header
  let logo = new Image()
  logo.src = '/images/demande_logo.png'
  doc.addImage(logo, 'PNG', 40,35)

  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(10)
  doc.text(300,50, 'Date :')
  doc.text(300,65, 'From :')
  doc.text(300,80, 'Departement :')
  doc.setFont('Helvertica', 'normal')
  doc.setFontSize(8)
  doc.text(325,50, demande.date_creation)
  doc.text(330,65, demande.userId)
  doc.text(350,80, demande.departementId)

  //title
  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(15)
  doc.text(90,150, 'Demande achat :')
  doc.line(90,152, 165,152)
  doc.setFont('Helvertica', 'normal')
  doc.setFontSize(15)
  doc.text(180,150, demande.title)
  //items table
  autoTable(doc,{
    startY: 200,
    head: [['item id', 'name', 'quantity']],
    body: getMeTableItem(items)
  })
  //signature
  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(8)
  doc.text(45,480, "validation directeur du departement")

  if(demande.validation_1 ===true){
    let signature1 = new Image()
    signature1.src = '/images/signature1.png'
    doc.addImage(signature1, 'PNG', 45,500)
  }

  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(8)
  doc.text(320,480, "validation directeur d'achat")
  if(demande.validation_2 ===true){
    let signature2 = new Image()
    signature2.src = '/images/signature2.png'
    doc.addImage(signature2, 'PNG', 320,490)
  }

  // demande Id
  doc.setFont('Helvertica', 'normal')
  doc.setFontSize(8)
  doc.text(180,580, "demande Id : "+demande.id)
  



  doc.save('demandeAchat.pdf')
}