@prototypes_data = [
  {
    name: 'First module / First prototype'
  },
  {
    name: 'First oscillator'
  },
  {
    name: 'Oscillator with React components'
  },
  {
    name: 'Tone.js basics'
  },
  {
    name: 'Tone.js with UI'
  },
  {
    name: 'Tone.js with UI, better change function'
  },
  {
    name: 'Tone.js with UI, composition'
  },
  {
    name: 'Tone.js with UI, sampler'
  },
  {
    name: 'Knob in UI, Show/Hide Instrument, Show/Hide UI Parts'
  },
  {
    name: 'JS Events And Surface UI Element'
  },
  {
    name: 'Effects UI as components'
  },
  {
    name: 'New UI Elements And Interactions (Random)'
  },
  {
    name: 'Settings Presets'
  },
  {
    name: 'UI Systematisation'
  },
  {
    name: 'Final synth'
  },
  {
    name: 'ADC Tuneblaster 2023 v0.1: Basic data structure'
  },
  {
    name: 'ADC Tuneblaster 2023 v0.2: Node connection'
  },
  {
    name: 'ADC Tuneblaster 2023 v0.3: Add bus nodes to create "spaces"'
  },
  {
    name: 'ADC Tuneblaster 2023 v0.4: New instruments to test "spaces"'
  },
  {
    name: 'ADC Tuneblaster 2023 v1.0: UI'
  },
  {
    name: 'ADC Tuneblaster 2023 v1.1: Channel volume slider'
  },
  {
    name: 'Simple circle generator'
  },
  {
    name: 'Using images'
  },
  {
    name: 'More images, improved data structure'
  },
  {
    name: 'The Store concept'
  },
  {
    name: 'Using Promise'
  },
  {
    name: 'Using Store with Promise'
  },
  {
    name: 'Cascading Promises'
  },
  {
    name: 'Using Promise.all'
  },
  {
    name: 'First algorythmic design'
  },
  {
    name: 'First Canvas'
  },
  {
    name: 'Canvas Basics'
  },
  {
    name: 'Separated Data Layer'
  },
  {
    name: 'P5 With UI'
  },
  {
    name: 'Previous P5 Sketch on HTML'
  },
  {
    name: 'Hue Range Slider'
  },
  {
    name: 'Tiling 1'
  },
  {
    name: 'Tiling 2'
  },
  {
    name: 'Tiles With UI'
  },
  {
    name: 'Circles'
  },
  {
    name: 'Displacement'
  },
  {
    name: 'Displacement with UI on React'
  },
  {
    name: 'React UI + P5 Sketch + Tone.js Sound (fast)'
  },
  {
    name: 'Images on canvas'
  },
  {
    name: 'Composite image html + canvas save'
  }
]

def seed
  reset_db
  create_prototypes
end

def reset_db
  Rake::Task['db:drop'].invoke
  Rake::Task['db:create'].invoke
  Rake::Task['db:migrate'].invoke
end

def create_prototypes
  @prototypes_data.each do |prototype_data|
    prototype = Prototype.create!(prototype_data)
    puts "#{prototype.name} prototype just created"
  end
end

seed
