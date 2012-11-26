---
layout: page
title: Interface Vision - Documentation
tagline: Blog and Such
group: navigation
---
{% include JB/setup %}

{% assign posts_collate = site.posts %}


<div class="row-fluid">
	<div class="span3">
		{% include themes/twitter/about %} 
	</div>
	<div class="span9">
		<div class="hero-unit">
			<h1>Documentation and Design</h1>
			 <p>Documentation and Design Documents for Simple Interface Programming (SIP) and Interface Vision.</p>
      <ul>
        {% if site.JB.posts_collate.provider == "custom" %}
          {% include custom/posts_collate %}
        {% else %}
          {% for post in posts_collate  %}
            {% capture this_category %}{{ post.category }}{% endcapture %}
            {% capture next_category %}{{ post.previous.category }}{% endcapture %}


            {% if forloop.first %}
              <h2>{{ this_category }}</h2>
              <ul>
            {% endif %}

            <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>

            {% if forloop.last %}
              </ul>
            {% else %}
              {% if this_year != next_year %}
                </ul>
                <h2>{{next_category}}</h2>
                <ul>
              {% endif %}
            {% endif %}
          {% endfor %}
        {% endif %}
        {% assign posts_collate = nil %}
      </ul>


		</div>
	</div>
</div>