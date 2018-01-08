$(function() { // IIFE

    // Four objects for MVO, we have 2 views
    var model, octopus, view, viewNav;

    model = {
        // cat that is displayed
        currentCat: null,
        // data array
        cats: [
            {
                clickCount : 0,
                name : 'Tabby',
                imgSrc : 'https://farm6.staticflickr.com/5598/14934282524_344c84246b.jpg',
            },
            {
                clickCount : 0,
                name : 'Tiger',
                imgSrc : 'https://farm9.staticflickr.com/8018/7380380362_0589be0be1.jpg',
            },
            {
                clickCount : 0,
                name : 'Scaredy',
                imgSrc : 'https://farm6.staticflickr.com/5224/5675069067_c427114ce0.jpg',
            },
            {
                clickCount : 0,
                name : 'Shadow',
                imgSrc : 'https://farm7.staticflickr.com/6100/6303228181_59371c29dc.jpg',
            },
            {
                clickCount : 0,
                name : 'Sleepy',
                imgSrc : 'https://farm3.staticflickr.com/2234/1704658865_3b982b56cf.jpg',
            }
        ]
    };

    view = {
        init: function () {
            // selecting some DOM elements
            this.catName    = $("#show-cat-name");
            this.catImg     = $("#show-cat-img");
            this.catClicks  = $("#show-cat-clicks");
            this.editCat    = $("button#edit-cat");
            this.catEditForm = $("#cat-edit-form");
            this.editClicks  = $("input#edit-cat-clicks");
            this.editName    = $("input#edit-cat-name");
            this.editURL     = $("input#edit-cat-url");
            this.cancelEditCat = $("button#cancel-edit-cat");
            this.saveEditCat = $("button#save-edit-cat");
            this.renderEditCat = false;

            // event when cat image is clicked
            this.catImg.click(function() {
                octopus.incrementClicks();
            });

            // event when Cancel button is clicked (this button is shown in Admin mode)
            this.cancelEditCat.click(function () {
                var cat = octopus.getCurrentCat();
                view.editClicks.val(cat.clickCount);
                view.editName.val(cat.name);
                view.editURL.val(cat.imgSrc);
            });

            // event when Save button is clicked (this button is shown in Admin mode)
            this.saveEditCat.click(function () {
                var cat = {
                    clickCount : view.editClicks.val(),
                    name : view.editName.val(),
                    imgSrc : view.editURL.val(),
                };
                octopus.save2CurrentCat(cat);
            });

            // render the screen
            this.render();
        },
        render: function () {
            // get the current cat
            var currentCat = octopus.getCurrentCat();
            this.catImg.attr("src", currentCat.imgSrc);
            this.catName.text(currentCat.name);
            this.catClicks.text(currentCat.clickCount);

            // updating the Admin mode controls
            this.editClicks.val(currentCat.clickCount);
            this.editName.val(currentCat.name);
            this.editURL.val(currentCat.imgSrc);

            // toggling the display css property for Admin mode control
            if(this.renderEditCat) {
                this.catEditForm.removeClass("d-none");
            } else {
                this.catEditForm.addClass("d-none");
            }
        },
    };

    viewNav = {
        init: function () {
            // selecting some DOM elements
            this.catList = $("#cat-lists");
            this.newCatURL = $("input#new-cat-url");
            this.newCatName = $("input#new-cat-name");
            this.newCatImg = $("#new-cat-img");
            this.newCatModal = $("#add-new-cat-modal");
            this.btnSaveNewCat = $("button#save-new-cat");
            this.chkBxAdminMode = $("input:checkbox#admin-mode");

            // event when Save button is clicked (this button is shown in the modal)
            this.btnSaveNewCat.click(function() {
                octopus.addNewCat();
                viewNav.newCatModal.modal("hide");
            });

            // event when modal is completely hidden
            this.newCatModal.on("hidden.bs.modal", function() {
                viewNav.newCatName.val("");
                viewNav.newCatURL.val("");
            });

            // event when CheckBox is clicked for Admin mode
            this.chkBxAdminMode.change(function() {
                if(this.checked) {
                    octopus.enableAdminMode();
                    viewNav.chkBxAdminMode.parent().removeClass("bg-secondary");
                    viewNav.chkBxAdminMode.parent().addClass("bg-warning");
                } else {
                    octopus.disableAdminMode();
                    viewNav.chkBxAdminMode.parent().removeClass("bg-warning");
                    viewNav.chkBxAdminMode.parent().addClass("bg-secondary");
                }
            });

            // render the nav
            this.render();
        },
        render: function () {
            // get all cats
            var cats = octopus.getCats();
            // string to add new element to `ul#cat-lists`
            var listStr = '<li class="nav-item"><a class="nav-link pl-4 p-2" href="#{{catName}}">{{catName}}</a></li>';
            var appendStr, i, len = cats.length;
            // loops through all cats
            for(i = 0; i < len; i++) {
                appendStr = listStr.replace("{{catName}}", cats[i].name).replace("{{catName}}", cats[i].name);
                this.catList.append(appendStr);
                // adding click event to `li` using scoped function
                $("#cat-lists li:last-child").click(function(cat) {
                    return function() {
                        octopus.setCurrentCat(cat);
                    };
                }(cats[i]));
            }
        },

        // modified the above function but implemented for single item when called when adding a new cat
        renderItem: function(cat){
            var listStr = '<li class="nav-item"><a class="nav-link pl-4 p-2" href="#">{{catName}}</a></li>';
            var appendStr = listStr.replace("{{catName}}", cat.name);
            this.catList.append(appendStr);
            $("#cat-lists li:last-child").click(function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                };
            }(cat));
        },

        // to update the nav list when name is changed in the Admin mode
        renderUpdateListItem: function(cat, id) {
            $("#cat-lists li:nth-child(" + id + ") .nav-link").text(cat.name);
            // the event needs to be updated as well
            $("#cat-lists li:nth-child(" + id + ")").click(function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                };
            }(cat));
        }
    };

    octopus = {
        init: function () {
            // initializing model and view
            model.currentCat = model.cats[0];
            viewNav.init();
            view.init();
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        setCurrentCat: function(cat) {
            model.currentCat = cat;
            // render needs to be called when changing cat
            view.render();
        },
        incrementClicks: function() {
            // updating clicks and the view
            model.currentCat.clickCount++;
            view.render();
        },
        getCats: function() {
            // get all cats
            return model.cats;
        },
        addNewCat: function() {
            // add new cat
            var cat = {
                clickCount : 0,
                name : viewNav.newCatName.val(),
                imgSrc : viewNav.newCatURL.val(),
            };
            // push it to model.cats array
            model.cats.push(cat);
            viewNav.renderItem(cat);
        },
        enableAdminMode: function () {
            view.renderEditCat = true;
            view.render();
        },
        disableAdminMode:function() {
            view.renderEditCat = false;
            view.render();
        },
        save2CurrentCat: function(cat) {
            // this runs when saving the cat data in Admin mode
            var id = $.inArray(this.getCurrentCat(), model.cats);
            model.cats[id] = cat;
            model.currentCat = cat;
            view.render();
            viewNav.renderUpdateListItem(cat, id+1);
        }
    };

    // this runs the entire above model
    octopus.init();

}());