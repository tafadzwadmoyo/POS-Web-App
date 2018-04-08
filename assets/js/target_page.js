for (i in pages){
    main_active='main-inactive';
    if (i==0){
        main_active='';
    }
    $("#main").append("<"+pages[i].target +"-page class='"+main_active+"'></"+pages[1].target +"-page>")
}