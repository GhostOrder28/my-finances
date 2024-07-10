"use strict";(self["webpackChunkmy_finances"]=self["webpackChunkmy_finances"]||[]).push([[429],{3429:function(e,a,t){t.r(a),t.d(a,{default:function(){return F}});var n=t(3396),s=t(7139),i=t(9242);const o={class:"container p-4"},l={class:"d-flex flex-column align-items-baseline gap-2 align-items-center"},m={class:"d-flex gap-2 align-items-center"},r={key:0,class:"fs-6"},c={key:1,class:"fs-6"},u={class:"fs-2 fw-bold"},f={class:"fs-6 fst-italic"},p={class:"fs-6"},d={class:"d-flex flex-column align-items-start gap-3"},y=(0,n._)("h2",{class:"fs-6 m-0"},[(0,n._)("label",{for:"date"},"Fecha de venta *")],-1),h={class:"d-flex flex-column align-items-start gap-3"},g=(0,n._)("h2",{class:"fs-6 m-0"},[(0,n._)("label",{for:"amountPaid"},"Monto del pago *")],-1),w={class:"w-100 d-flex flex-column align-items-start"},D={class:"input-group"},$=(0,n._)("span",{class:"input-group-text"},"S/",-1),b={key:0,class:"error-message mt-1",for:"amountPaid"},_={class:""};function S(e,a,t,S,v,k){const x=(0,n.up)("Icon"),N=(0,n.up)("date-picker"),Z=(0,n.up)("FormButtons");return(0,n.wg)(),(0,n.iD)("section",o,[(0,n._)("h1",l,[(0,n._)("span",m,[(0,n.Wm)(x,{name:"new-payment"}),"newpayment"===e.$route.name?((0,n.wg)(),(0,n.iD)("span",r,"Nuevo pago de")):(0,n.kq)("",!0),"editpayment"===e.$route.name?((0,n.wg)(),(0,n.iD)("span",c,"Editar pago de")):(0,n.kq)("",!0)]),(0,n._)("span",u,(0,s.zw)(e.$route.query.clientName),1),(0,n._)("span",f,(0,s.zw)(e.$route.query.clientNameDetails),1),(0,n._)("span",p,"por una venta realizada el "+(0,s.zw)(e.saleDate),1)]),(0,n._)("form",{class:"d-flex flex-column gap-3",onSubmit:a[2]||(a[2]=(0,i.iM)(((...a)=>e.handleSubmit&&e.handleSubmit(...a)),["prevent"])),id:"myform",style:(0,s.j5)({height:e.formHeight+"px"}),ref:"formRef"},[(0,n._)("div",d,[y,(0,n.Wm)(N,{class:"date-picker",name:"date",value:e.formState.paymentDate,"onUpdate:value":a[0]||(a[0]=a=>e.formState.paymentDate=a),formatter:e.dateFormat},null,8,["value","formatter"])]),(0,n._)("div",h,[g,(0,n._)("div",w,[(0,n._)("div",D,[$,(0,n.wy)((0,n._)("input",{class:"form-control",name:"amountPaid",type:"number",step:"0.01","onUpdate:modelValue":a[1]||(a[1]=a=>e.formState.amount=a)},null,512),[[i.nr,e.formState.amount]])]),e.formErrors?((0,n.wg)(),(0,n.iD)("label",b,(0,s.zw)(e.formErrors.amount),1)):(0,n.kq)("",!0)]),(0,n._)("span",_,"Actualmente su deuda es de S/ "+(0,s.zw)(e.unpaidAmount),1)])],36),(0,n.Wm)(Z,{ref:"actionsRef",onFormSubmit:e.handleSubmit,confirmLabel:"newpayment"===e.$route.name?"Añadir pago":"Confirmar",cancelLabel:"Cancelar"},null,8,["onFormSubmit","confirmLabel"])])}t(7658);var v=t(3784),k=t(737),x=t(725),N=t(3332),Z=t(8898),A=t(5072),M=(0,n.aZ)({data(){return{formHeight:0,clientName:"",clientNameDetails:"",saleDate:"",unpaidAmount:NaN,formState:{paymentDate:new Date,amount:NaN},formErrors:{}}},components:{Icon:v.Z,DatePicker:N.Z,FormButtons:x.Z},methods:{async handleSubmit(){try{const{params:{clientid:e,saleid:a,paymentid:t},name:n}=this.$route;"newpayment"===n&&await Z.Z.patch(`/clients/${e}/sales/${a}/payments`,this.formState),"editpayment"===n&&t&&await Z.Z.patch(`/clients/${e}/sales/${a}/payments/${t}`,this.formState),this.$router.push({name:"sale",params:{clientid:e,saleid:a}})}catch(e){(0,A.IZ)(e)&&(this.formErrors=e.response?.data.validationError)}},async getPaymentData(){const{params:{clientid:e,saleid:a,paymentid:t},name:n}=this.$route;let s;if("newpayment"===n){s=await Z.Z.get(`/clients/${e}/sales/${a}?filter=paymentform`);const{clientName:t,clientNameDetails:n,unpaidAmount:i,saleDate:o}=s.data.saleData;this.unpaidAmount=i,this.saleDate=(0,k.Z)(new Date(o),"dd-MM-yyyy")}if("editpayment"===n){s=await Z.Z.get(`/clients/${e}/sales/${a}/payments/${t}`);const{clientName:n,clientNameDetails:i,unpaidAmount:o,saleDate:l,paymentDate:m,amount:r}=s.data.paymentData;this.formState={paymentDate:new Date(m),amount:r},this.unpaidAmount=o,this.saleDate=(0,k.Z)(new Date(l),"dd-MM-yyyy")}}},async beforeMount(){await this.getPaymentData()},mounted(){const{formRef:e,actionsRef:a}=this.$refs;console.log("window inner height",window.innerHeight),console.log("form offset top",e.offsetTop),console.log("actions ref height",a.$el),this.formHeight=window.innerHeight-e.offsetTop-a.$el.clientHeight-30}}),z=t(89);const E=(0,z.Z)(M,[["render",S]]);var F=E}}]);
//# sourceMappingURL=429.ae40f2cb.js.map