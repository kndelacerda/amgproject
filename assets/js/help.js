(function(n, t) {
    function l() {
        t("#tourModal").modal("show")
    }
    function a() {
        r = u[i];
        var n = t(r.selector).first();
        n.length == 0 ? i < u.length ? o() : s() : h(n)
    }
    function o() {
        if (!(i >= u.length)) {
            if (i++,
            r = u[i],
            r == null) {
                i--;
                return
            }
            var n = t(r.selector).first();
            n.length == 0 ? o() : h(n)
        }
    }
    function s() {
        if (!(i < 0)) {
            if (i--,
            r = u[i],
            r == null) {
                i++;
                return
            }
            var n = t(r.selector).first();
            n.length == 0 ? s() : h(n)
        }
    }
    function h(n) {
        var f = t(window).width()
          , e = t(window).height()
          , h = Math.floor(f * .8)
          , c = Math.floor(e * .6)
          , w = Math.floor((f - h) / 2)
          , b = Math.floor((e - c) / 3)
          , l = Math.min(.95, h / n.width())
          , a = r.title
          , k = r.subtitle
          , v = r.body
          , y = r.footer
          , p = n[0].outerHTML;
        t("#tourModal .modal-body").html(`
            <div class="row">
            <div class="col-lg-10 col-lg-offset-1">
            <h1 class="text-cyan text-center">${a}</h1>
            <p class="text-center">${v}</p>
            </div>
            </div>
           <div class="row bottom-gutter-15">
            <div class="col-xs-6 text-left">
            <button id="dynamic-help-previous" class ="btn btn-link btn-xs" title="Previous"><i class ="fa fa-arrow-left fa-2x text-cyan" aria-hidden="true"></i></button>
            </div>
            <div class="col-xs-6 text-right">
            <button id="dynamic-help-next" class ="btn btn-link btn-xs pull-right" title="Next"><i class ="fa fa-arrow-right fa-2x text-cyan" aria-hidden="true"></i></button>
            </div>
            </div>
            <div class="row">
            <div class="col-xs-12 text-center" style="pointer-events: none;padding:5px;border:1px solid rgba(255,255,255,.1);border-radius:5px;transform:scale(${l});overflow:hidden;margin:auto;padding:15px 0px"><div>${p}</div></div>
            </div>
            
           </div>
            <h3>${y}</h3>`);
        t("#dynamic-help-previous").click(s);
        t("#dynamic-help-next").click(o);
        i == 0 ? (t("#dynamic-help-previous").css({
            opacity: .3
        }),
        t("#dynamic-help-previous").prop("disabled", !0)) : (t("#dynamic-help-previous").css({
            opacity: 1
        }),
        t("#dynamic-help-previous").prop("disabled", !1));
        i == u.length - 1 ? (t("#dynamic-help-next").css({
            opacity: .3
        }),
        t("#dynamic-help-next").prop("disabled", !0)) : (t("#dynamic-help-next").css({
            opacity: 1
        }),
        t("#dynamic-help-next").prop("disabled", !1))
    }
    var f = n.help = n.help || {}, e, c;
    f.publicProperty = null;
    f.publicMethod = function() {}
    ;
    f.main = function(n) {
        n != null && (e = n,
        u = c[n.mapping],
        u.length > 0 && t("#page-help").css("display", "block"),
        t("#dynamic-help-btn").click(l),
        t("#startTour").click(function() {
            a()
        }),
        e.auto && e.auto === !0 && l())
    }
    ;
    c = {
        home: [{
            selector: "#dynamic-help-btn",
            title: "Page Help",
            subtitle: "",
            body: "Click this blue icon and we'll help guide you through HIDIVE.",
            footer: ""
        }, {
            selector: "#simulcast",
            title: "Simulcasts",
            subtitle: "",
            body: "Catch the newest episode or binge the whole season here.",
            footer: ""
        }, {
            selector: "#dubbed",
            title: "Dubs",
            subtitle: "",
            body: "Premium Members get access to watch all the dubs.",
            footer: ""
        }, {
            selector: "#episodes",
            title: "Recently Added",
            subtitle: "",
            body: "Check here daily to view the newest content on HIDIVE.",
            footer: ""
        }],
        stream: [{
            selector: "#chat-now-subscribe",
            title: "Chat Now!",
            subtitle: "",
            body: "Premium Members can chat with friends or make new ones while they watch their favorite shows or movies.",
            footer: ""
        }, {
            selector: "#chat-now-enable",
            title: "Enable Chat Now!",
            subtitle: "",
            body: "You must enable your Community Profile in your Profile Settings to chat.",
            footer: ""
        }, {
            selector: "#chat-now",
            title: "Chat Now!",
            subtitle: "",
            body: "Use this feature to join an existing chat or create your own while you watch!",
            footer: ""
        }, {
            selector: "#lights",
            title: "Lights out",
            subtitle: "Theater Mode",
            body: 'Fade the screen to black with "lights out" for a better viewing experience.',
            footer: ""
        }, {
            selector: "#versions-menu",
            title: "Pick Your Video",
            subtitle: "",
            body: "Prefer Japanese audio with English subtitles? Prefer English dubs? Use this option to choose which option is right for you.",
            footer: ""
        }, {
            selector: "#font-color-menu",
            title: "Select Your Font Color",
            subtitle: "",
            body: "Yellow or White, the option is yours for subtitles and captions.",
            footer: ""
        }, {
            selector: "#streamHelp",
            title: "Bug Report",
            subtitle: "",
            body: 'Use this button to report any issues you experience with the video playback. Don\'t forget to hit "send"!',
            footer: ""
        }],
        profile: [{
            selector: "#private-info",
            title: "Private Settings",
            subtitle: "",
            body: "These are your private settings. You're the only one who sees this information.",
            footer: ""
        }, {
            selector: "#streaming-info",
            title: "Streaming Settings",
            subtitle: "",
            body: "Want dubs? Subs? Yellow subtitles? Customize your default streaming settings here.",
            footer: ""
        }, {
            selector: "#social-info",
            title: "Community Settings",
            subtitle: "",
            body: "Want to join the HIDIVE Community? Check this box and fill in some information to engage with others.",
            footer: ""
        }],
        avatar: [{
            selector: ".avatar-container",
            title: "Avatar",
            subtitle: "",
            body: "This is your avatar, in other words, your HIDIVE face. This face follows you into the Community, Live Chat, and beyond… just kidding!",
            footer: ""
        }, {
            selector: "#avatar-controls",
            title: "Avatar Controls",
            subtitle: "",
            body: "Use these control options to assist your creative process. If you aren't satisfied with your customized choices, use the 'blank canvas' button to start from scratch, 'revert' to go back to your last configuration, or let us do the work for you with the 'randomize avatar' and 'randomize colors' commands.",
            footer: ""
        }, {
            selector: "#hair-controls",
            title: "All Things Customizable",
            subtitle: "",
            body: "From hair type, color, and accessories, with sliding color scales, the possibilities for your avatar are endless. Don't forget to save your creation when you're done!",
            footer: ""
        }]
    };
    var i = 0, u, r = null
}
)(window.hidive = window.hidive || {}, jQuery)
