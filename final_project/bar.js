d3.csv('../data/difficulty_distribution.csv').then(data => {

    for (let d of data) {
        d.usa_routes = +d.usa_routes;
    }

    // console.log(data)

    const height = 400,
        width = 800,
        margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#bar")
                .append("svg")
                .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
                .domain(data.map(d => d.grade))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.usa_routes)]).nice()
                .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = (g) => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y))

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect")
    .attr("fill", "#B42F90")
    .attr("x", d => x(d.grade))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d.usa_routes))
    .attr("height", d => y(0) - y(d.usa_routes));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0em")
      .attr("dy", "-0.1em") 
      .text("Grade");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Number of People Sent");

    // bar.append('text')
    //     .text(d => d.grade)
    //     .attr('x', d => x(d.grade) + (x.bandwidth()/2))
    //     .attr('y', d => y(d.usa_routes) + 15)
    //     .attr('text-anchor', 'middle')
    //     .style('fill', '#black');

});