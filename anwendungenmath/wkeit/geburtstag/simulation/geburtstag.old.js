function chkFormular(){if(""==document.a.n.value)return alert("Wert für n eingeben!"),document.a.n.focus(),!1;var e=parseInt(document.a.n.value);if(2>e||e>300||isNaN(e))return alert("falscher Wert für n"),document.a.n.value="",document.a.n.focus(),!1;if(document.a.n.value=e,""==document.a.k.value)return alert("Wert für k eingeben!"),document.a.k.focus(),!1;var a=parseInt(document.a.k.value);return 2>a||a>e||isNaN(a)?(alert("falscher Wert für k"),document.a.k.value="",document.a.k.focus(),!1):(document.a.k.value=a,void 0)}