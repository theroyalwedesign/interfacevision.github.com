---
layout: page
title: Interface Vision - Signup
id: signup
tagline: Signup for Interface Vision's beta program.
theme:
  name: twitter
---
{% include JB/setup %}

<!-- Carousel ================================================== -->
<div id="myCarousel" class="carousel slide">
  <div class="carousel-inner">
    <div class="item active">
      <img src="{{ ASSET_PATH }}/img/carousel/slide-03.jpg" alt="">
      <div class="container">
        <div class="carousel-caption">
          <h1>Signup Now</h1>
          <p class="lead">Signup for our beta program.</p>
<!--           <p class="lead">Please also take the time to <a href="https://twitter.com/interfaceVision" class="twitter-follow-button" data-show-count="false" data-size="large" data-show-screen-name="false" data-dnt="true">Follow</a> us on Twitter.</p> -->
          <p class="lead">We will not share your email with anyone.</p>
        </div> <!-- carousel-caption -->
      </div> <!-- container -->
    </div> <!-- item active -->
  </div> <!-- carousel-inner -->
</div>

<!-- Marketing Messaging and Featurettes ================================================== -->
<!-- Wrap the rest of the page in another container to center all the content. -->

<div class="container marketing">
  <div class="featurette" id="Proposals">
    <div class="form-horizontal">

      <script type="text/javascript">
      var submitted=false;
      </script>
      <iframe id="hidden_iframe" name="hidden_iframe" onload="if (submitted) {window.location='/signupthankyou.html';}" style="display: none;"> </iframe>

      <form action="https://docs.google.com/spreadsheet/formResponse?formkey=dEl5UUNockZlNmthNzVVeDFqeHVyTWc6MQ&amp;theme=0AX42CRMsmRFbUy1iOGYwN2U2Mi1hNWU0LTRlNjEtYWMyOC1lZmU4ODg1ODc1ODI&amp;ifq" method="POST" id="ss-form" onsubmit="submitted=true;" target="hidden_iframe">
        <div class="control-group">
          <label class="control-label" for="entry_0">Email</label>
          <div class="controls">
            <input type="text" name="entry.0.single" id="entry_0" placeholder="Email"></input>
          </div>
        </div>
    <!--      <div class="control-group">
          <label class="control-label" for="entry_2">Feedback</label>
          <div class="controls">
            <span class="help-block">What types of feedback would you like to give? Note that we will only send you an email if you check one or more options.</span>
            <label class="checkbox">
              <input type="checkbox" name="entry.1.group" value="UX" id="group_1_1"></input>
              The User Experience (UX)
            </label>
            <label class="checkbox">
              <input type="checkbox" name="entry.1.group" value="UI" id="group_1_2"></input>
              The User Interface (UI)
            </label>
            <label class="checkbox">
              <input type="checkbox" name="entry.1.group" value="DEV" id="group_1_3"></input>
              As a developer
            </label>
            <label class="checkbox">
              <input type="checkbox" name="entry.1.group" value="BIS" id="group_1_4"></input>
              As a business analyst
            </label>
            <label class="checkbox">
              <input type="checkbox" name="entry.1.group" value="CORE" id="group_1_5"></input>
              Looking at and reviewing your core technology
            </label>
            <label class="checkbox">
              <input type="checkbox" name="entry.1.group" value="OTHER" id="group_1_6"></input>
              Other - Please describe in feedback entry below
            </label>
          </div>
        </div> -->
        <div class="control-group">
          <label class="control-label" for="entry_3">Comments</label>
          <div class="controls">
            <textarea name="entry.2.single" rows="8" cols="75" id="entry_2"> </textarea>
          </div>
        </div>
        <input type="hidden" name="pageNumber" value="0"></input>
        <input type="hidden" name="backupCache" value=""></input>

        <div class="control-group">
          <div class="controls">
            <button class="btn btn-large btn-success" type="submit" name="submit" value="Submit">Sign Up Now</button>
          </div>
        </div>
      </form>
    </div>
  </div> <!-- featurette -->
  
  <hr class="featurette-divider">

</div>

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
