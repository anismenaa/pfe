//pdf
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const getMeTableItem = (items)=> {
  const table = []

  for(let i=0; i<items.length; i++) {
    const itemsTable1d = []
    itemsTable1d.push(items[i].id)
    itemsTable1d.push(items[i].quantity)
    table.push(itemsTable1d)
  }
  return table
}
export const generateBonSortiePdf = (bs, items) => {
  var doc = new jsPDF('portrait', 'px', 'a4', 'false')
  //header
  let logo = new Image()
  logo.src = '/images/demande_logo.png'
  doc.addImage(logo, 'PNG', 40,35)

  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(10)

  doc.text(300,65, 'From :')
  doc.text(300,80, 'destination :')
  doc.text(300,95, 'date :')

  doc.setFont('Helvertica', 'normal')
  doc.setFontSize(8)
  doc.text(323,65, "departement de stockage")
  doc.setFontSize(8)
  doc.text(343,80, bs.departementId)
  doc.text(323,95, bs.date_sortie)
  //title
  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(20)
  doc.text(200,150, 'Bon Sortie')
  doc.setFont('Helvertica', 'normal')
  //items table
  autoTable(doc,{
    startY: 200,
    head: [['item id/name', 'quantity']],
    body: getMeTableItem(items)
  })
  //signature

  

  doc.setFont('Helvertica', 'bold')
  doc.setFontSize(8)
  doc.text(320,480, "signature")
  if(bs.finalised ===true){
    let signature2 = new Image()
    signature2.src = '/images/signature2.png'
    doc.addImage(signature2, 'PNG', 320,490)
  }

  // demande Id
  doc.setFont('Helvertica', 'normal')
  doc.setFontSize(8)
  doc.text(180,580, "bon sortie Id : "+bs.id)
  



  doc.save('BonSortie.pdf')
}