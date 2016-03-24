var s;

function drawGraph() {
  var nodes = getNodes();
  var edges = getEdges();
  var g = {
    nodes: nodes,
    edges: edges
  };

  // Instantiate sigma:
  s = new sigma({
    graph: g,
    container: 'graph',
    settings: {
      maxNodeSize: 2,
      labelThreshold: 0,
      defaultLabelSize: 8,
      sideMargin: 100,
      mouseEnabled: false,
      touchEnabled: false,
      mouseWheelEnabled: false,
      doubleClickEnabled: false,
      zoomingRatio: 1,
      doubleClickZoomingRatio: 1,
    }
  });
}

function getNodes() {
  var nodes = [];

  var nodeText = $('#node-text').val();
  nodeText.split('\n').forEach(function (line) {
    var elements = line.match(/\S+/g);
    if (elements !== null) {

      // set y to negative y because coordinates are oriented differently
      var node = {
        id: elements[0],
        label: elements[0] + ' (' + elements[1] + ', ' + elements[2] + ')',
        x: parseInt(elements[1]),
        y: -parseInt(elements[2]),
        size: 1,
        color: '#666'
      };

      nodes.push(node);
    }
  });

  return nodes;
}

function getEdges() {
  var edges = [];

  var edgeText = $('#edge-text').val();

  edgeText.split('\n').forEach(function (line) {
    var elements = line.match(/\S+/g);
    if (elements !== null) {

      // set y to negative y because coordinates are oriented differently
      var edge = {
        id: elements[0] + elements[1],
        source: elements[0],
        target: elements[1],
        size: parseFloat(elements[2]),
        color: '#ccc',
      };

      edges.push(edge);
    }
  });

  return edges;
}

function clearGraph() {
  $('#graph').remove();
  $('#graph-container').html('<div id="graph"></div>');
}

$('#node-text').bind('input propertychange', function () {
  clearGraph();
  drawGraph();
});

$('#edge-text').bind('input propertychange', function () {
  clearGraph();
  drawGraph();
});

function initialize() {
  $.get('data/cityxy.txt', function (data) {
    // $('#node-text').attr('placeholder', data);
    $('#node-text').val(data);
    $.get('data/citypairs.txt', function (data) {
      // $('#edge-text').attr('placeholder', data);
      $('#edge-text').val(data);
      drawGraph();
    });
  });

}

initialize();
