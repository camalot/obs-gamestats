$(function() {
	let args = {};
	$('[data-type="arg"]').each(function(i, a) {
		let $a = $(a);
		let key = $a.attr("name");
		args[key] = $a.val();
	});
	let poll = parseInt(args.poll, 0) || 60 * 1000;
	let url = `/api/${args.game}/${args.platform || "pc"}/${args.username ||
		"ninja"}/${args.mode}?fields=${args.fields}`;
	let _getTemplate = function(type) {
		return $(`[data-template='${type}']`)
			.first()
			.clone()
			.removeClass("hidden")
			.removeAttr("data-template");
	};

	let _run = function(url) {
		$.ajax(url, {
			error: (xhr, status, err) => {
				console.log(err);
			},
			success: (data, text, xhr) => {
				let target = $("#overlay-labels");
				for (let i = 0; i < data.length; ++i) {
					let item = data[i];
					let type = item.field.endsWith("_") ? "progress" : "label";
					let template = _getTemplate(type);
					let old = $(`#${item.field}`).first();
					template.attr("id", item.field);
					switch (type) {
						case "label":
							let $l = $("[data-type='label']", template);
							let $v = $("[data-type='value']", template);
							$l.html(item.label);
							$l.attr("data-field", item.field);
							$v.html(item.display);
							break;
						case "progress":
							$(".mdl-js-progress", template).first().on('mdl-componentupgraded', function() {
								this.MaterialProgress.setProgress(item.value);
								if ($(".mdl-js-progress .progressbar-label", template).length === 0) {
									$(".mdl-js-progress", template).append(`<div class="progressbar-label">${item.display}</div>`);
								}
							}).get(0);
							break;
						default:
							break;
					}
					if (old.length === 1) {
						target.remove(old);
					}

					target.append(template);
				}
			}
		});
	};
	setInterval(function() {
		_run(url);
	}, poll);
	_run(url);
});
