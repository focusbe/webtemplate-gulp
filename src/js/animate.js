// var $ = require("jquery");
import Animate from "ztgamejs/css3animate"
Animate.to(
    ".div1",
    {
        width: "100%",
        x: 100,
        marginTop: 100
    },
    function () {
        Animate.set(".div1", {
            width: 100,
            x: 0
        });
        Animate.to(
            ".div1",
            {
                height: "200px"
            },
            function () {
                // Animate.keyframe.run(".div1", "move1", function() {
                // 	alert("end");
                // });
            }
        );
    }
);

