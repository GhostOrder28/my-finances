"use strict";(self["webpackChunkmy_finances"]=self["webpackChunkmy_finances"]||[]).push([[656],{725:function(e,t,a){a.d(t,{Z:function(){return f}});var n=a(3396),o=a(7139),r=a(9242);const l={class:"container px-4 w-100 d-flex gap-4"};function i(e,t,a,i,s,c){return(0,n.wg)(),(0,n.iD)("div",l,[(0,n._)("button",{class:"flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill bg-blue text-light-purple",type:"button",onClick:t[0]||(t[0]=t=>e.$emit("formSubmit"))},(0,o.zw)(a.confirmLabel),1),a.single?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:0,class:"flex-grow-1 py-2 border-0 fs-6 fw-bold rounded-pill bg-red text-light-red",type:"button",onClick:t[1]||(t[1]=(0,r.iM)((t=>e.$router.back()),["prevent"]))},(0,o.zw)(a.cancelLabel),1))])}var s={props:{confirmLabel:{type:String,required:!0},cancelLabel:{type:String,required:!0},single:{type:Boolean,default:!1,required:!1}}},c=a(89);const m=(0,c.Z)(s,[["render",i]]);var f=m},6656:function(e,t,a){a.r(t),a.d(t,{default:function(){return E}});var n=a(3396),o=a(7139),r=a(9242);const l={class:"d-flex gap-3 align-items-center"},i={key:0,class:"fs-3 fw-bold m-0"},s={key:1,class:"fs-3 fw-bold m-0"},c={class:"d-flex flex-column gap-3 align-items-start"},m=(0,n._)("label",{class:"fs-6",for:"clientName"},"Nombre *",-1),f={key:0,class:"fs-6",for:"clientName"},d={class:"d-flex flex-column gap-3 align-items-start"},u=(0,n._)("label",{class:"fs-6",for:"clientNameDetails"},"Detalle del nombre",-1),p={class:"d-flex flex-column gap-2"},h=(0,n._)("span",{class:"detail-description text-start"},"Esto es opcional, pero es útil para diferenciar entre dos personas con el mismo nombre.",-1),g={key:0,class:"fs-6",for:"clientNameDetails"},b={class:"d-flex flex-column gap-3 align-items-start"},w=(0,n._)("label",{class:"fs-6",for:"contactPhone"},"Número de contacto",-1),y={key:0,class:"fs-6",for:"contactPhone"};function x(e,t,a,x,N,D){const k=(0,n.up)("Icon"),S=(0,n.up)("FormButtons");return(0,n.wg)(),(0,n.iD)("section",{style:(0,o.j5)({height:e.sectionHeight+"px"}),class:"container p-4"},[(0,n._)("div",l,[(0,n.Wm)(k,{name:"new-client"}),"newclient"===e.$route.name?((0,n.wg)(),(0,n.iD)("h1",i,"Nuevo cliente")):(0,n.kq)("",!0),"editclient"===e.$route.name?((0,n.wg)(),(0,n.iD)("h1",s,"Editar cliente")):(0,n.kq)("",!0)]),(0,n._)("span",null,(0,o.zw)(e.formErrors.notFoundError),1),(0,n._)("form",{class:"d-flex flex-column gap-4 mt-4",ref:"formRef",style:(0,o.j5)({height:e.formHeight+"px"}),onSubmit:t[3]||(t[3]=(0,r.iM)(((...t)=>e.handleSubmit&&e.handleSubmit(...t)),["prevent"]))},[(0,n._)("div",c,[m,(0,n.wy)((0,n._)("input",{class:"form-control","onUpdate:modelValue":t[0]||(t[0]=t=>e.formState.clientName=t),name:"clientName",type:"text",placeholder:"Nombre del cliente"},null,512),[[r.nr,e.formState.clientName]]),e.formErrors.clientName?((0,n.wg)(),(0,n.iD)("label",f,(0,o.zw)(e.formErrors.clientName),1)):(0,n.kq)("",!0)]),(0,n._)("div",d,[u,(0,n._)("div",p,[(0,n.wy)((0,n._)("input",{class:"form-control","onUpdate:modelValue":t[1]||(t[1]=t=>e.formState.clientNameDetails=t),name:"clientNameDetails",type:"text",placeholder:"amigo, vecino, etc"},null,512),[[r.nr,e.formState.clientNameDetails]]),h]),e.formErrors.clientNameDetails?((0,n.wg)(),(0,n.iD)("label",g,(0,o.zw)(e.formErrors.clientNameDetails),1)):(0,n.kq)("",!0)]),(0,n._)("div",b,[w,(0,n.wy)((0,n._)("input",{class:"form-control","onUpdate:modelValue":t[2]||(t[2]=t=>e.formState.contactPhone=t),name:"contactPhone",type:"text",placeholder:"Número para contactar al cliente"},null,512),[[r.nr,e.formState.contactPhone]]),e.formErrors.contactPhone?((0,n.wg)(),(0,n.iD)("label",y,(0,o.zw)(e.formErrors.contactPhone),1)):(0,n.kq)("",!0)])],36),(0,n.Wm)(S,{ref:"actionsRef",confirmLabel:"newclient"===e.$route.name?"Añadir client":"Confirmar",cancelLabel:"Cancelar"},null,8,["confirmLabel"])],4)}a(7658);var N=a(3784),D=a(8898),k=a(5072),S=a(725),_=(0,n.aZ)({data(){return{formHeight:0,formState:{clientName:"",clientNameDetails:"",contactPhone:""},formErrors:{}}},components:{Icon:N.Z,FormButtons:S.Z},methods:{async handleSubmit(){try{const{clientid:e}=this.$route.params;let t;console.log(JSON.stringify(this.formState,null,2)),t="editclient"===this.$route.name?await D.Z.patch(`/clients/${e}`,this.formState):await D.Z.post(`/clients/${this.$store.state._id}`,this.formState),console.log("res",t.data),this.$router.push({name:"client",params:{clientid:t.data.clientId}})}catch(e){(0,k.IZ)(e)&&(this.formErrors=e.response?.data.validationError)}},async getClientData(){try{const e=await D.Z.get(`/clients/${this.$route.params.clientid}?single=true`),{sales:t,...a}=e.data.clientData;this.formState=a}catch(e){(0,k.IZ)(e)&&(this.formErrors=e.response?.data)}}},async beforeMount(){this.$route.params.clientid&&await this.getClientData()},mounted(){const{formRef:e,actionsRef:t}=this.$refs;this.formHeight=window.innerHeight-e.offsetTop-t.$el.clientHeight-30}}),v=a(89);const $=(0,v.Z)(_,[["render",x]]);var E=$}}]);
//# sourceMappingURL=656.55c969d1.js.map