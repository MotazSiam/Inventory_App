import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import domToImage from 'dom-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
//import moment from 'moment';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild('content') content!:ElementRef;  
  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef ;
  product:any;
  url:any;
  totalCount :number=0;
  totalAmount:number =0 ;
  productId : number = 0 ;
datePicker: any;
  pdfName: any;
  constructor( public http: HttpClient , @Inject('BASE_URL') baseUrl: string , private router: Router ) {   this.url =baseUrl;
this.url="https://localhost:7064/";
}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.params['id']);
  
    this .http.get<any>(this.url+ "api/"+"product/GetById?productId="+this.productId).subscribe(result => {
      this.product = result;
      this.calculateTotal();
    }, error => console.error(error));


    
  }

  calculateTotal(){
    this.product.batchProducts.forEach((batchProduct:any) =>{
    if(batchProduct.btachType==0){
      this.totalAmount = this.totalAmount + (batchProduct.count* batchProduct.price);
    }
    if(batchProduct.btachType==1){
      this.totalAmount = this.totalAmount - (batchProduct.count* batchProduct.price);
    }

     });
  }
  public routeTo(link:any){
    this.router.navigateByUrl('/'+link);
  }

  public downloadAsPdf(): void {
    
    const width = this.dataToExport.nativeElement.clientWidth;
    const height = this.dataToExport.nativeElement.clientHeight + 40;
    let orientation = '';
    let imageUnit = 'pt';
    if (width > height) {
    orientation = 'l';
    } else {
    orientation = 'p';
    }
   ;
    domToImage
    .toPng(this.dataToExport.nativeElement, {
    width: width,
    height: height
    })
    .then(result => {
    let jsPdfOptions = {
    orientation: orientation,
    unit: imageUnit,
    format: [width + 50, height + 220]
    };
 
    const pdf = new jsPDF("p","mm","a4");
   
    pdf.setFontSize(48);
    pdf.setTextColor('#2585fe');
    pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
    pdf.setFontSize(24);
    pdf.setTextColor('#131523');
    pdf.text('Report date: ' + moment().format('ll'), 25, 115);
    pdf.addImage(result, 'PNG', 25, 185, width, height);
    pdf.save('file_name'+ '.pdf');
    })
    .catch(error => {
      alert(JSON.stringify(error));
    });
    }

  
  public SavePDF(): void {  
    let content=this.content.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element:any,renderer: any){  
        return true;  
      }  
    };  

    doc.save('test.pdf');  
  }  


  handleExport(){
    const exportElement = document.getElementById('content') as HTMLElement;
    html2canvas(exportElement,{}).then(canvas=>{
      const imgData = canvas.toDataURL('image/png');
      const height = canvas.height*210/canvas.width;
      const pdf  =new jsPDF ("l","mm","a4");
      console.log(imgData);
      pdf.setFontSize(48);
      pdf.setTextColor('#2585fe');
      pdf.setFontSize(24);
      pdf.setTextColor('#131523');
      pdf.text('Report date: ' + moment().format('ll'), 25, 115);
     //pdf.addImage(result, 'PNG', 25, 185, width, height);

     pdf.addImage(imgData,'PNG',0,0,210,height);
      pdf.save('file_name'+ '.pdf');
    

    }) ;
  }


   async saveDiv() {
    var doc = new jsPDF();
    const exportElement = document.getElementById('content') as HTMLElement;

    doc.setFontSize(12);
    doc.setTextColor('#2585fe');
    doc.text('Report date: ' + moment().format('ll'), 25, 115);
    await  doc.html(`<html><head><title>Test Print</title></head><body>` +exportElement.innerHTML + `</body></html>`);
    doc.save('div.pdf');
   }
  

}
