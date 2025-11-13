import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
    >
      <div className="flex items-start gap-2">
        <div 
          className="drag-handle" 
          {...attributes}
          {...listeners}
          style={{ 
            cursor: 'grab',
            padding: '8px 4px',
            marginRight: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            className="w-5 h-5 text-gray-400 hover:text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}

interface TodoItem {
  id: string;
  title: string;
  body: string;
}

export function DraggableTodoList() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addEmptyTodo = () => {
    const newTodo: TodoItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      body: '',
    };
    setItems([...items, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<TodoItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleSave = () => {
    setIsSaving(true);
    const result = {
      todos: items,
      timestamp: new Date().toISOString()
    };
    console.log('Saved todos:', JSON.stringify(result, null, 2));
    setTimeout(() => {
      setIsSaving(false);
      alert('Todo list saved! Check console for JSON output');
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <button
            onClick={addEmptyTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Task
          </button>
        </div>

        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <div className="flex-1 p-4 border rounded bg-white shadow">
                    <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateTodo(item.id, { title: e.target.value })}
                    placeholder="Task"
                    autoFocus={item.title === ''}
                    onMouseDown={(e) => e.stopPropagation()}
                    />
                    <textarea
                    value={item.body}
                    onChange={(e) => updateTodo(item.id, { body: e.target.value })}
                    className="w-full text-gray-700 p-2"
                    rows={3}
                    placeholder="Description"
                    onMouseDown={(e) => e.stopPropagation()}
                    />
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>

        {items.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 rounded text-white ${
                isSaving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save All Tasks'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}