/*

How to use people-connecter:
1. make sure data is populated
1. apply class="pc-options" to list of options using div tags for both parent and children elements
2. create a placeholder <ul> tag with class="pc-target" for the result

Include these libraries:
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.3.13/slick.css"/>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.3.13/slick.min.js"></script> 
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.js"></script>
<script type="text/javascript" src="js/people-connector.js"></script>

*/

(function(){
	// data
	var FACULTY = {
		"1" : {"Id":"1","Name":"Ackerman, Mark","Title":"Professor","Research":"Human-computer interaction","Phone":"(734) 764-2476","Email":"ackerm@umich.edu","Website":"https://www.si.umich.edu/people/mark-ackerman","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/mark-ackerman.png?api=v2"},
		"2" : {"Id":"2","Name":"Adams, Robert","Title":"Associate Professor","Research":"Architecture, Design, China, Disability","Phone":"(734)764-1300","Email":"robadams@umich.edu","Website":"http://taubmancollege.umich.edu/faculty/directory/robert-adams","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/robert-adams.png?api=v2"},
		"3" : {"Id":"3","Name":"Adar, Eytan","Title":"Associate Professor","Research":"Information","Phone":"(734) 647-8028","Email":"eadar@umich.edu","Website":"http://www.cond.org/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/eytan-adar.png?api=v2"},
		"4" : {"Id":"4","Name":"Ahlquist, Sean","Title":"Assistant Professor of Architecture","Research":"Material computation","Phone":"(734) 277-8189","Email":"ahlquist@umich.edu","Website":"https://facebook.com/researchMC","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/sean-ahlquist.png?api=v2"},
		"5" : {"Id":"5","Name":"Andersen, Jan-Henrik","Title":"Associate Professor","Research":"Design Language","Phone":"(734) 615-3615","Email":"janhande@umich.edu","Website":"http://art-design.umich.edu/people/detail/jan-henrik_andersen","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/jan-henrik-andersen.png?api=v2"},
		"6" : {"Id":"6","Name":"Awtar, Shorya","Title":"Associate Professor","Research":"Machine and Mechanism Design, Mechatronics, Precision engineering","Phone":"(734) 615-0285","Email":"awtar@umich.edu","Website":"psdl.engin.umich.edu","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/shorya-awtar.png?api=v2"},
		"7" : {"Id":"7","Name":"Baker, Wayne","Title":"Professor","Research":"Social networks, values","Phone":"(734) 764-2306","Email":"wayneb@umich.edu","Website":"http://michiganross.umich.edu/faculty-research/faculty/wayne-baker","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/wayne-baker.png?api=v2"},
		"8" : {"Id":"8","Name":"Barton, Kira","Title":"Assistant Professor","Research":"Advanced manufacturing & control","Phone":"(734) 764-7293","Email":"bartonkl@umich.edu","Website":"http://brg.engin.umich.edu/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/kira-barton.png?api=v2"},
		"9" : {"Id":"9","Name":"Batra, Rajeev","Title":"S S Kresge Professor of Marketing","Research":"Strategy and tactics of brand building","Phone":"(734) 764-0118","Email":"rajeevba@umich.edu","Website":"http://michiganross.umich.edu/faculty-research/faculty/rajeev-batra","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/rajeev-batra.png?api=v2"},
		"10" : {"Id":"10","Name":"Bell, Havey A.","Title":"Professor of Engineering Practice","Research":"Automotive Engineering, Systems Engineering","Phone":"248-404-7096","Email":"ahbelliv@umich.edu","Website":"http://experts.umich.edu/expert.asp?n=A+Harvey+H+Bell+IV&u_id=158","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/harvey-bell.png?api=v2"},
		"11" : {"Id":"11","Name":"Brei, Diann","Title":"Professor, Program Director","Research":"","Phone":"(734) 763-6617","Email":"dibrei@umich.edu","Website":"http://isd.engin.umich.edu/people/diann-brei","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/diann-brei.png?api=v2"},
		"12" : {"Id":"12","Name":"Corey, Jason","Title":"Chair","Research":"Critical lisening and audio tools","Phone":"(734) 615-4383","Email":"coreyja@umich.edu","Website":"http://www.music.umich.edu/faculty_staff/bio.php?u=coreyja","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/jason-corey.png?api=v2"},
		"13" : {"Id":"13","Name":"Daly, Shanna","Title":"Assistant Research Scientist and Adjunct Assistant Professor","Research":"Design approaches and ideation","Phone":"(734) 647-8402","Email":"srdaly@umich.edu","Website":"http://www-personal.umich.edu/~srdaly/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/shanna-daly.png?api=v2"},
		"14" : {"Id":"14","Name":"Essl, Georg","Title":"Assistant Professor","Research":"Human computer interaction, computer music","Phone":"(734) 615-2691","Email":"gessl@eecs.umich.edu","Website":"http://www.eecs.umich.edu/~gessl/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/georg-essl.png?api=v2"},
		"15" : {"Id":"15","Name":"Feinberg, Fred","Title":"Handleman Professor of Management and Professor of Statistics","Research":"Choices in uncertain environments","Phone":"(734) 764-4711","Email":"feinf@umich.edu","Website":"http://michiganross.umich.edu/faculty-research/faculty/fred-feinberg","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/fred-feinberg.png?api=v2"},
		"16" : {"Id":"16","Name":"Fishman, Barry","Title":"Professor","Research":"Learning environments","Phone":"(734)647-8027","Email":"fishman@umich.edu","Website":"http://www-personal.umich.edu/~fishman/","ImageLink":"http://www-personal.umich.edu/~fishman/_Media/barryjun04_med.jpeg"},
		"17" : {"Id":"17","Name":"Fishman, Barry","Title":"Professor","Research":"Education and Information","Phone":"(734) 647-8027","Email":"fishman@umich.edu","Website":"http://www-personal.umich.edu/~fishman/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/barry-fishman.png?api=v2"},
		"18" : {"Id":"18","Name":"Gilchrist, Brian","Title":"Professor","Research":"Multidisciplinary design","Phone":"(734) 763-6230","Email":"brian.gilchrist@umich.edu","Website":"http://www.eecs.umich.edu/~gilchrst/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/brian-gilchrist.png?api=v2"},
		"19" : {"Id":"19","Name":"Gillespie, Brent","Title":"Associate Professor","Research":"Haptic interface and robotics","Phone":"(734) 647-6907","Email":"brentg@umich.edu","Website":"https://me-web2.engin.umich.edu/pub/directory/bio?uniqname=brentg","ImageLink":"https://me-web2.engin.umich.edu/pub/images/brentg.jpg"},
		"20" : {"Id":"20","Name":"Gonzalez, Richard","Title":"Professor","Research":"Judgment and decision making","Phone":"(734) 647-6785","Email":"gonzo@umich.edu","Website":"http://www.rcgd.isr.umich.edu/people/gonzalez.html","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/richard-gonzales.png?api=v2"},
		"21" : {"Id":"21","Name":"Gurevich, Michael","Title":"Assistant Professor","Research":"Interactive music","Phone":"(734) 647-4458","Email":"mdgurev@umich.edu","Website":"http://www.music.umich.edu/faculty_staff/bio.php?u=mdgurev","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/michael-gurevich.png?api=v2"},
		"22" : {"Id":"22","Name":"Hammer, Gary","Title":"Millie Schembechler Professor of Adrenal Cancer  University of Michigan  Director - Endocrine Oncology Program  Director - Center for Organogenesis","Research":"Medicine","Phone":"(734) 615-2421","Email":"ghammer@umich.edu","Website":"http://www.med.umich.edu/hammerlab/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/gary-hammer.png?api=v2"},
		"23" : {"Id":"23","Name":"Huang-Saad, Aileen","Title":"Associate Professor of Practice","Research":"Impact and engaged learning","Phone":"(734) 647-9737","Email":"aileenhs@umich.edu","Website":"http://www.bme.umich.edu/people/index.php?un=aileenhs","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/aileen-huang-saad.png?api=v2"},
		"24" : {"Id":"24","Name":"Johnson, Timothy","Title":"Professor & Chair","Research":"obstetrics and women's health , sustainable global partnerships","Phone":"(734) 764-8123","Email":"trbj@med.umich.edu","Website":"http://www.uofmhealth.org/profile/84/timothy-robert-b-johnson-md","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/tim-johnson.png?api=v2"},
		"25" : {"Id":"25","Name":"Johnson-Roberson, Matt ","Title":"Assistant Professor","Research":"Robotics/Computer Vision","Phone":"(734) 764-3767","Email":"mattjr@umich.edu","Website":"http://droplab.engin.umich.edu/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/matt-johnson-roberson.png?api=v2"},
		"26" : {"Id":"26","Name":"Kitayama, Shinobu","Title":"Professor","Research":"LSA: Psychology","Phone":"(734) 276-1180","Email":"kitayama@umich.edu","Website":"http://www.rcgd.isr.umich.edu/people/kitayama.html","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/shinobu-kitayama.png?api=v2"},
		"27" : {"Id":"27","Name":"Klasnja, Predrag","Title":"Assistant Professor","Research":"Human computer interaction","Phone":"(734) 764-8624","Email":"klasnja@umich.edu","Website":"http://www.si.umich.edu/people/predrag-klasnja","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/predrag-klasnja.png?api=v2"},
		"28" : {"Id":"28","Name":"Lee, Honglak","Title":"Assistant Professor","Research":"EECS","Phone":"(734) 764-3726","Email":"honglak@umich.edu","Website":"http://web.eecs.umich.edu/~honglak/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/honglak-lee.png?api=v2"},
		"29" : {"Id":"29","Name":"Lee, Joyce","Title":"Associate Professor","Research":"Pediatric Endocrinology","Phone":"(734) 615-3139","Email":"joyclee@umich.edu","Website":"http://joyceisplayingontheinter.net/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/joyce-lee.png?api=v2"},
		"30" : {"Id":"30","Name":"Liu, Yili","Title":"Arthur F Thurnau Professor","Research":"Cognitive ergonomics","Phone":"(734)763-0464","Email":"yililiu@umich.edu","Website":"http://ioe.engin.umich.edu/people/fac/yililiu.php","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/yili-liu.png?api=v2"},
		"31" : {"Id":"31","Name":"Lovejoy, Bill","Title":"Raymond T J Perring Family Professor of Business Administration, Professor of Technology and Operations, Professor of Art & Design","Research":"Management of innovation","Phone":"(734) 763-1391","Email":"wlovejoy@umich.edu","Website":"http://michiganross.umich.edu/faculty-research/faculty/bill-lovejoy","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/bill-lovejoy.png?api=v2"},
		"32" : {"Id":"32","Name":"Luntz, Jonathan E.","Title":"Assistant Research Scientist, Mechanical Engineering","Research":"","Phone":"(734) 615-3889","Email":"jluntz@umich.edu","Website":"https://me-web2.engin.umich.edu/pub/directory/bio?uniqname=jluntz","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/jon-luntz.jpg?api=v2"},
		"33" : {"Id":"33","Name":"Marshall, John","Title":"Associate Professor","Research":"Design methods","Phone":"(734) 615-8062","Email":"johnjm@umich.edu","Website":"http://art-design.umich.edu/people/detail/john_marshall","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/john-marshall.png?api=v2"},
		"34" : {"Id":"34","Name":"McCullough, Malcolm","Title":"Professor","Research":"Architecture, ambient interface","Phone":"(734) 417-5707","Email":"mmmc@umich.edu","Website":"http://www.umich.edu/~mmmc/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/malcolm-mccullough.png?api=v2"},
		"35" : {"Id":"35","Name":"Melville, Nigel P.","Title":"Associate Professor","Research":"Design thinking, digital services, environmental sustainability.","Phone":"(734) 764-0199","Email":"npmelv@umich.edu","Website":"http://nigelmelville.org/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/nigel-melville.png?api=v2"},
		"36" : {"Id":"36","Name":"Newman, Mark W.","Title":"Associate Professor","Research":"HCI and Ubiquitous Computing","Phone":"(734) 764-0020","Email":"mwnewman@umich.edu","Website":"http://mwnewman.people.si.umich.edu/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/mark-newman.png?api=v2"},
		"37" : {"Id":"37","Name":"O'Modhrain, Sile","Title":"Associate Professor","Research":"","Phone":"(734) 647-4459","Email":"sileo@umich.edu","Website":"http://www.somodhrain.com/palpable/default.html","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/sile-omodhrain.png?api=v2"},
		"38" : {"Id":"38","Name":"Papalambros, Panos","Title":"Professor","Research":"Design of products and systems","Phone":"(734) 647-8401","Email":"pyp@umich.edu","Website":"http://isd.engin.umich.edu/people/panos-papalambros","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/panos-papalambros.png?api=v2"},
		"39" : {"Id":"39","Name":"Reed, Matthew","Title":"Research Professor","Research":"Anthropometry and biomechanics","Phone":"(734) 936-1111","Email":"mreed@umich.edu","Website":"http://mreed.umtri.umich.edu/mreed/","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/matthew-reed.png?api=v2"},
		"40" : {"Id":"40","Name":"Rush, Stephen","Title":"Professor","Research":"Music Technology, Performance and Dance","Phone":"(734) 764-5582","Email":"srush@umich.edu","Website":"http://www.music.umich.edu/faculty_staff/bio.php?u=&lname=rush&fname=stephen","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/stephen-rush.png?api=v2"},
		"41" : {"Id":"41","Name":"Sarter, Nadine","Title":"Professor","Research":"Cognitive Ergonomics","Phone":"(734)-763-5773","Email":"sarter@umich.edu","Website":"http://ioe.engin.umich.edu/people/fac/sarter.php","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/nadine-sarter.png?api=v2"},
		"42" : {"Id":"42","Name":"Seagull, Jacob F.","Title":"Assistant Professor","Research":"Human factors in healthcare","Phone":"Tel: (734) 763-1424","Email":"jseagull@umich.edu","Website":"http://medicine.umich.edu/dept/lhs/f-jacob-seagull-phd","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/jacob-seagull.png?api=v2"},
		"43" : {"Id":"43","Name":"Seifert, Colleen","Title":"Professor","Research":"Creativity in Design","Phone":"(734) 763-0210","Email":"seifert@umich.edu","Website":"http://isd.engin.umich.edu/people/colleen-seifert","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/colleen-seifert.png?api=v2"},
		"44" : {"Id":"44","Name":"Sienko, Kathleen","Title":"Associate Professor, Miller Faculty Scholar","Research":"Medical device design; user requirement elicitation methods; design ethnography","Phone":"(734) 647-8249","Email":"sienko@umich.edu","Website":"http://sienkolab.engin.umich.edu","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/kathleen-sienko.png?api=v2"},
		"45" : {"Id":"45","Name":"Simoni, Mary","Title":"Professor Emerita","Research":"Algorithmic Composition, Musical Instrument Design","Phone":"(734) 764-0583","Email":"msimoni@rpi.edu","Website":"http://www.hass.rpi.edu/pl/contact-information-s17/?objectID=474","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/mary-simoni.png?api=v2"},
		"46" : {"Id":"46","Name":"Skerlos, Steve","Title":"Arthur F. Thurnau Professor","Research":"Technology Sustainability","Phone":"(734) 615-5253","Email":"skerlos@umich.edu","Website":"http://steve-skerlos.org","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/steven-skerlos.png?api=v2"},
		"47" : {"Id":"47","Name":"Teitelbaum, Daniel","Title":"Professor","Research":"Pediatrics","Phone":"(734) 936-9784","Email":"dttlbm@umich.edu","Website":"http://sitemaker.umich.edu/teitelbaum/teitelbaum_laboratory_research","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/daniel-teitelbaum.png?api=v2"},
		"48" : {"Id":"48","Name":"Winful, Herbert","Title":"Professor","Research":"Optics and Photonics","Phone":"(734) 647-1804","Email":"arrays@umich.edu","Website":"http://www.sitemaker.umich.edu/herbert.winful/home","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/herbert-winful.png?api=v2"},
		"49" : {"Id":"49","Name":"Yates, Frank","Title":"Professor","Research":"Judgment and decision processes","Phone":"(734) 764-6138","Email":"jfyates@umich.edu","Website":"http://michiganross.umich.edu/faculty-research/faculty/frank-yates","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/frank-yates.png?api=v2"},
		"50" : {"Id":"50","Name":"Ybarra, Oscar","Title":"Professor","Research":"Entrepreneurship, Intelligence and Problem solving","Phone":"(734) 763-1078","Email":"oybarra@umich.edu","Website":"http://www.lsa.umich.edu/psych/people/faculty/ci.ybarraoscar_ci.detail","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/oscar-ybarra.png?api=v2"},
		"51" : {"Id":"51","Name":"Yoon, Carolyn","Title":"Associate Professor","Research":"Consumer neuroscience and marketing","Phone":"(734) 764-6355","Email":"yoonc@umich.edu","Website":"http://www.carolynyoon.com","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/carolyn-yoon.png?api=v2"},
		"52" : {"Id":"52","Name":"Zurbuchen, Thomas","Title":"Professor","Research":"Space Instruments and Systems, Innovation","Phone":"(734) 647-6835","Email":"thomasz@umich.edu","Website":"http://aoss.engin.umich.edu/people/thomasz","ImageLink":"https://confluence.engin.umich.edu/download/attachments/21103180/thomas-zurbuchen.png?api=v2"}

	}

	var TOPIC_TO_FACULTY_MAP = {
		"Aesthetics in Design" : ["2","5","9","15","20","21","49","51"],
		"Consumer Design" : ["4","5","15","26","43","49","51"],
		"Contemplative Methods" : ["2","11","40"],
		"Data-Driven Design" : ["3","8","15","28","34","42"],
		"Decision Making in Design" : ["2","4","15","17","20","26","46","49","50"],
		"Design Education" : ["2","11","13","17","20","23","33","35","43","44","46"],
		"Design Environments" : ["1","2","17","20","23"],
		"Design for Context" : ["5","17","22","27","36","46"],
		"Design Optimization" : ["15","20","38","46"],
		"Design Thinking" : ["2","5","6","13","17","20","22","26","27","29","33","35","43","50"],
		"Design Tools, Methods and Processes" : ["2","5","11","13","17","22","29","32","36","43","46"],
		"Device Innovation" : ["6","8","11","19","32","37","38","44","52"],
		"Ergonomics in Design" : ["5","30","34","39","41","42"],
		"Humanitarian Design" : ["2","13","22","24","39","42","44","46"],
		"Interaction Design" : ["1","2","3","17","21","22","27","35","36","40","41"],
		"Materials Design" : ["2","11","32","39","40"],
		"Media Design" : ["2","14","19","21","34"],
		"Medical Device Design " : ["2","8","11","19","24","41","42","44","47"],
		"Multidisciplinary Design" : ["2","5","10","11","13","15","17","18","21","22","23","33","36","37","41","42","46"],
		"Multisensory Design" : ["2","12","14","19","21","22","42","44","52"],
		"Organizational Processes in Design" : ["2","7","17","22","50"],
		"Sustainable Design" : ["1","4","5","35","46"],
		"Systems Design " : ["3","5","8","22","29","41","46"],
		"User Centered Design" : ["1","3","13","14","17","20","22","27","29","35","36","41","44","46"],
		"Architecture" : ["4","2","33","34"],
		"Art & Design" : ["5","12","33","37"],
		"Business" : ["7","9","15","31","35","51"],
		"Engineering and Computer Science" : ["3","6","8","10","11","13","14","19","23","25","28","32","36","38","41","44","46","48","52"],
		"Information" : ["1","3","17","27","30","36"],
		"Medicine" : ["22","24","29","42","47"],
		"Music, Theater and Dance" : ["21","37","40"],
		"Social Sciences" : ["17","20","26","43","46","49","50"]
	}


	var jQuery,
		slick,
		Mustache;

    $(function() {
		//TODO: make sure all the libraries are loaded
//		jQuery = window.jQuery;
		slick = window.slick;
		Mustache = window.Mustache;
		main();

    })

	var template = '<li><span class="img-wrap">' +
	  '<img src="{{ImageLink}}" alt="" /></span>' +
	  '<div><a href="{{Website}}" target="_blank"><strong>{{Name}}</strong></a>' +
	  '<br/><span style="color:#FFF">{{Title}}</span><br /></div></li>';

	var updateActiveTopic = function() {
		$('.slick-slide').removeClass('active');
		$('.slick-slide.slick-active.slick-center').addClass('active');
		return;
	};

	var updateTarget = function(topicIndex) {
		var topic = selectedTopic(topicIndex);
		if (topic && TOPIC_TO_FACULTY_MAP[topic]) {
			var htmlTemplate = '';
			$.each(TOPIC_TO_FACULTY_MAP[topic], function(index, personId) {
				htmlTemplate += Mustache.to_html(template, FACULTY[personId]);
				if (index == TOPIC_TO_FACULTY_MAP[topic].length - 1) {
					$('.pc-target').html(htmlTemplate);
				}
			});
		}
		$('.pc-target').scrollTop(0)
		return;
	};

	var selectedTopic = function(topicIndex) {
		var topicSelector;
		if (typeof topicIndex !== 'undefined') {
			topicSelector = $("div[index='" + topicIndex.toString() + "']");
		} 
		else {
			topicSelector = $('.pc-options').find('.active');
		}
		if (topicSelector.length > 1) {
			var firstTopicSelector = $(topicSelector[0]),
				secondTopicSelector = $(topicSelector[1]);
			if (!!firstTopicSelector.text() && 
				firstTopicSelector.text() == secondTopicSelector.text()) {
				return firstTopicSelector.text();
			}
		}
		else if (topicSelector.length == 1) {
			return topicSelector.text();
		}
		else {
			console.log('the topic selected was not found');
			return;
		}
	};

	function main() {

		$(document).ready(function(){

		  $('.pc-options').slick({
		  	vertical: true,
		  	centerMode: true,
		  	dots: false,
		  	draggable: true,
		  	waitForAnimate: false, // slickGoTo won't wait for animation to stop
		  	nextArrow: $('.scroll-down'),
		  	prevArrow: $('.scroll-up'),
		  	onAfterChange: function(event, centerIndex) {
		  		//update faculty when user click the next button 
		  		updateActiveTopic();
		  		updateTarget(centerIndex);
		  	}
		  });

		  //init people connector
		  (function() {
		  	var activeIndex;
		  	//find default active option
		  	var parentSelector = $('.pc-options');
		  	if (parentSelector) {
			  	if (parentSelector.find('.active') && 
			  		parentSelector.find('.active').attr('index')) {
			  		activeIndex = parentSelector.find('.active').attr('index');
			  	}
			  	parentSelector.slickGoTo(parseInt(activeIndex));
			  	updateTarget();
			  	parentSelector.find('.active a').click();
		  	}

		  })();

		  //update faculty when user click selector
		  $('.slick-slide').find('a').on('click', function() {
		  	var self = $(this);
		  	var slideIndex = self.parents('.slick-slide').attr('index');
		  	var optionsSelector = self.parents('div.slick-slider');
		  	optionsSelector.slickGoTo(parseInt(slideIndex));
		  });

		});
	}

})();