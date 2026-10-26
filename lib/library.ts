export type Floor = { level: number; name: string }

export type Rack = {
  id: string
  floor: number
  section: string
  subject: string
  ddcRange: string
  shelves: number
  slotsPerShelf: number
  grid: { col: number; row: number }
  color: string
}

export type Book = {
  id: string
  title: string
  author: string
  year: number
  publisher: string
  edition?: string
  pages: number
  callNumber: string
  rackId: string
  shelf: number
  position: number
  copies: number
  available: number
  description: string
  tags: string[]
}

export const FLOORS: Floor[] = [
  { level: 0, name: 'Ground Floor' },
  { level: 1, name: 'First Floor' },
]

export const RACKS: Rack[] = [
  { id: 'R-01', floor: 0, section: 'A', subject: 'Computer Science', ddcRange: '000–009', shelves: 5, slotsPerShelf: 8, grid: { col: 1, row: 1 }, color: '#1f7a73' },
  { id: 'R-02', floor: 0, section: 'A', subject: 'Mathematics', ddcRange: '510–519', shelves: 5, slotsPerShelf: 8, grid: { col: 2, row: 1 }, color: '#3b6fb6' },
  { id: 'R-03', floor: 0, section: 'B', subject: 'Physics', ddcRange: '530–539', shelves: 5, slotsPerShelf: 8, grid: { col: 3, row: 1 }, color: '#6a5acd' },
  { id: 'R-04', floor: 0, section: 'B', subject: 'Chemistry', ddcRange: '540–549', shelves: 5, slotsPerShelf: 8, grid: { col: 1, row: 2 }, color: '#d9822b' },
  { id: 'R-05', floor: 0, section: 'C', subject: 'Biology', ddcRange: '570–579', shelves: 5, slotsPerShelf: 8, grid: { col: 2, row: 2 }, color: '#4c9a52' },
  { id: 'R-06', floor: 0, section: 'C', subject: 'Engineering', ddcRange: '620–629', shelves: 5, slotsPerShelf: 8, grid: { col: 3, row: 2 }, color: '#b35a3c' },
  { id: 'R-07', floor: 1, section: 'D', subject: 'Economics', ddcRange: '330–339', shelves: 5, slotsPerShelf: 8, grid: { col: 1, row: 1 }, color: '#2a8a9a' },
  { id: 'R-08', floor: 1, section: 'D', subject: 'Literature', ddcRange: '800–899', shelves: 5, slotsPerShelf: 8, grid: { col: 2, row: 1 }, color: '#a8487a' },
  { id: 'R-09', floor: 1, section: 'E', subject: 'History', ddcRange: '900–999', shelves: 5, slotsPerShelf: 8, grid: { col: 3, row: 1 }, color: '#8a6d3b' },
  { id: 'R-10', floor: 1, section: 'E', subject: 'Philosophy', ddcRange: '100–149', shelves: 5, slotsPerShelf: 8, grid: { col: 1, row: 2 }, color: '#5b6b8c' },
  { id: 'R-11', floor: 1, section: 'F', subject: 'Psychology', ddcRange: '150–159', shelves: 5, slotsPerShelf: 8, grid: { col: 2, row: 2 }, color: '#c25b5b' },
  { id: 'R-12', floor: 1, section: 'F', subject: 'Reference', ddcRange: '001–099', shelves: 5, slotsPerShelf: 8, grid: { col: 3, row: 2 }, color: '#4a7a3a' },
]

export const BOOKS: Book[] = [
  { id: 'BK-1001', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen et al.', year: 2009, publisher: 'MIT Press', edition: '3rd', pages: 1312, callNumber: '005.1 COR', rackId: 'R-01', shelf: 2, position: 3, copies: 6, available: 2, description: 'The definitive reference on algorithm design and analysis, covering sorting, graph algorithms, dynamic programming and NP-completeness.', tags: ['algorithms', 'data structures', 'core'] },
  { id: 'BK-1002', title: 'Clean Code', author: 'Robert C. Martin', year: 2008, publisher: 'Prentice Hall', pages: 464, callNumber: '005.1 MAR', rackId: 'R-01', shelf: 2, position: 5, copies: 3, available: 0, description: 'A handbook of agile software craftsmanship focused on writing readable, maintainable code.', tags: ['software engineering', 'best practices'] },
  { id: 'BK-1003', title: 'Structure and Interpretation of Computer Programs', author: 'Harold Abelson, Gerald J. Sussman', year: 1996, publisher: 'MIT Press', edition: '2nd', pages: 657, callNumber: '005.13 ABE', rackId: 'R-01', shelf: 3, position: 1, copies: 2, available: 1, description: 'A classic text on the fundamentals of programming, abstraction and computational processes.', tags: ['programming', 'lisp', 'classic'] },
  { id: 'BK-1004', title: 'Computer Networks', author: 'Andrew S. Tanenbaum', year: 2010, publisher: 'Pearson', edition: '5th', pages: 960, callNumber: '004.6 TAN', rackId: 'R-01', shelf: 1, position: 4, copies: 4, available: 3, description: 'A layered, top-to-bottom tour of computer networking from the physical layer to applications.', tags: ['networking', 'protocols'] },
  { id: 'BK-1005', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell, Peter Norvig', year: 2020, publisher: 'Pearson', edition: '4th', pages: 1136, callNumber: '006.3 RUS', rackId: 'R-01', shelf: 4, position: 2, copies: 5, available: 1, description: 'The leading textbook in artificial intelligence, covering search, logic, probabilistic reasoning and machine learning.', tags: ['ai', 'machine learning'] },
  { id: 'BK-1006', title: 'Operating System Concepts', author: 'Abraham Silberschatz et al.', year: 2018, publisher: 'Wiley', edition: '10th', pages: 976, callNumber: '005.43 SIL', rackId: 'R-01', shelf: 3, position: 6, copies: 4, available: 4, description: 'Foundational coverage of processes, memory management, file systems and concurrency.', tags: ['operating systems', 'core'] },

  { id: 'BK-2001', title: 'Calculus: Early Transcendentals', author: 'James Stewart', year: 2015, publisher: 'Cengage', edition: '8th', pages: 1368, callNumber: '515 STE', rackId: 'R-02', shelf: 2, position: 2, copies: 8, available: 5, description: 'A widely used calculus text covering limits, derivatives, integrals and multivariable calculus.', tags: ['calculus', 'first year'] },
  { id: 'BK-2002', title: 'Linear Algebra Done Right', author: 'Sheldon Axler', year: 2015, publisher: 'Springer', edition: '3rd', pages: 340, callNumber: '512.5 AXL', rackId: 'R-02', shelf: 3, position: 4, copies: 3, available: 2, description: 'A determinant-free approach to linear algebra emphasising vector spaces and linear maps.', tags: ['linear algebra', 'proofs'] },
  { id: 'BK-2003', title: 'Introduction to Probability', author: 'Joseph K. Blitzstein, Jessica Hwang', year: 2019, publisher: 'CRC Press', edition: '2nd', pages: 636, callNumber: '519.2 BLI', rackId: 'R-02', shelf: 4, position: 1, copies: 4, available: 0, description: 'Probability through stories and strategies, with an emphasis on intuition and simulation.', tags: ['probability', 'statistics'] },
  { id: 'BK-2004', title: 'Concrete Mathematics', author: 'Ronald L. Graham, Donald E. Knuth, Oren Patashnik', year: 1994, publisher: 'Addison-Wesley', edition: '2nd', pages: 672, callNumber: '510 GRA', rackId: 'R-02', shelf: 1, position: 6, copies: 2, available: 2, description: 'A foundation for computer science covering sums, recurrences, number theory and generating functions.', tags: ['discrete math', 'classic'] },

  { id: 'BK-3001', title: 'The Feynman Lectures on Physics, Vol. I', author: 'Richard P. Feynman', year: 2011, publisher: 'Basic Books', pages: 560, callNumber: '530 FEY', rackId: 'R-03', shelf: 2, position: 1, copies: 3, available: 1, description: 'Mechanics, radiation and heat, delivered in Feynman’s famously clear lecture style.', tags: ['mechanics', 'classic'] },
  { id: 'BK-3002', title: 'Introduction to Electrodynamics', author: 'David J. Griffiths', year: 2017, publisher: 'Cambridge University Press', edition: '4th', pages: 620, callNumber: '537.6 GRI', rackId: 'R-03', shelf: 3, position: 3, copies: 5, available: 3, description: 'The standard undergraduate text on electrostatics, magnetostatics and Maxwell’s equations.', tags: ['electromagnetism'] },
  { id: 'BK-3003', title: 'Concepts of Modern Physics', author: 'Arthur Beiser', year: 2003, publisher: 'McGraw-Hill', edition: '6th', pages: 560, callNumber: '539 BEI', rackId: 'R-03', shelf: 4, position: 5, copies: 4, available: 4, description: 'Relativity, quantum theory, atomic and nuclear physics for undergraduates.', tags: ['modern physics', 'quantum'] },

  { id: 'BK-4001', title: 'Organic Chemistry', author: 'Jonathan Clayden et al.', year: 2012, publisher: 'Oxford University Press', edition: '2nd', pages: 1264, callNumber: '547 CLA', rackId: 'R-04', shelf: 2, position: 2, copies: 4, available: 1, description: 'A mechanism-focused approach to organic chemistry with rich illustrations.', tags: ['organic', 'reactions'] },
  { id: 'BK-4002', title: 'Physical Chemistry', author: 'Peter Atkins, Julio de Paula', year: 2014, publisher: 'Oxford University Press', edition: '10th', pages: 1008, callNumber: '541 ATK', rackId: 'R-04', shelf: 3, position: 4, copies: 3, available: 2, description: 'Thermodynamics, quantum chemistry and kinetics in a comprehensive single volume.', tags: ['thermodynamics', 'kinetics'] },

  { id: 'BK-5001', title: 'Molecular Biology of the Cell', author: 'Bruce Alberts et al.', year: 2014, publisher: 'Garland Science', edition: '6th', pages: 1464, callNumber: '571.6 ALB', rackId: 'R-05', shelf: 2, position: 3, copies: 3, available: 0, description: 'The authoritative cell biology reference, from DNA to cell signalling and cancer.', tags: ['cell biology', 'genetics'] },
  { id: 'BK-5002', title: 'Campbell Biology', author: 'Lisa A. Urry et al.', year: 2020, publisher: 'Pearson', edition: '12th', pages: 1488, callNumber: '570 CAM', rackId: 'R-05', shelf: 1, position: 1, copies: 6, available: 4, description: 'A comprehensive introductory biology text covering evolution, ecology and physiology.', tags: ['general biology', 'first year'] },

  { id: 'BK-6001', title: 'Engineering Mechanics: Statics', author: 'J. L. Meriam, L. G. Kraige', year: 2015, publisher: 'Wiley', edition: '8th', pages: 528, callNumber: '620.1 MER', rackId: 'R-06', shelf: 2, position: 4, copies: 5, available: 3, description: 'Force systems, equilibrium, structures and friction for engineering students.', tags: ['mechanics', 'civil', 'mechanical'] },
  { id: 'BK-6002', title: 'Fundamentals of Electric Circuits', author: 'Charles K. Alexander, Matthew Sadiku', year: 2016, publisher: 'McGraw-Hill', edition: '6th', pages: 992, callNumber: '621.3 ALE', rackId: 'R-06', shelf: 3, position: 2, copies: 5, available: 2, description: 'DC and AC circuit analysis, operational amplifiers and frequency response.', tags: ['electrical', 'circuits'] },

  { id: 'BK-7001', title: 'Principles of Economics', author: 'N. Gregory Mankiw', year: 2020, publisher: 'Cengage', edition: '9th', pages: 880, callNumber: '330 MAN', rackId: 'R-07', shelf: 2, position: 2, copies: 7, available: 5, description: 'An accessible introduction to micro- and macroeconomics through ten core principles.', tags: ['micro', 'macro', 'first year'] },
  { id: 'BK-7002', title: 'Capital in the Twenty-First Century', author: 'Thomas Piketty', year: 2014, publisher: 'Harvard University Press', pages: 696, callNumber: '332 PIK', rackId: 'R-07', shelf: 3, position: 5, copies: 2, available: 1, description: 'A landmark study of wealth and income inequality over three centuries.', tags: ['inequality', 'economic history'] },

  { id: 'BK-8001', title: 'Things Fall Apart', author: 'Chinua Achebe', year: 1958, publisher: 'Heinemann', pages: 209, callNumber: '823 ACH', rackId: 'R-08', shelf: 3, position: 1, copies: 4, available: 3, description: 'A seminal novel of pre-colonial Igbo life and the arrival of European missionaries.', tags: ['fiction', 'african literature'] },
  { id: 'BK-8002', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, publisher: 'Penguin Classics', pages: 480, callNumber: '823.7 AUS', rackId: 'R-08', shelf: 3, position: 3, copies: 5, available: 5, description: 'Austen’s witty novel of manners, marriage and morality in Regency England.', tags: ['fiction', 'classic'] },
  { id: 'BK-8003', title: 'The Norton Anthology of English Literature', author: 'Stephen Greenblatt (ed.)', year: 2018, publisher: 'W. W. Norton', edition: '10th', pages: 3200, callNumber: '820.8 NOR', rackId: 'R-08', shelf: 1, position: 2, copies: 2, available: 0, description: 'The essential anthology spanning the Middle Ages to the twenty-first century.', tags: ['anthology', 'survey'] },

  { id: 'BK-9001', title: 'Guns, Germs, and Steel', author: 'Jared Diamond', year: 1997, publisher: 'W. W. Norton', pages: 480, callNumber: '909 DIA', rackId: 'R-09', shelf: 2, position: 3, copies: 3, available: 2, description: 'An exploration of why some societies came to dominate others across human history.', tags: ['world history', 'geography'] },
  { id: 'BK-9002', title: 'The Discovery of India', author: 'Jawaharlal Nehru', year: 1946, publisher: 'Penguin', pages: 656, callNumber: '954 NEH', rackId: 'R-09', shelf: 3, position: 2, copies: 3, available: 3, description: 'A sweeping account of Indian history, philosophy and culture written in prison.', tags: ['indian history'] },

  { id: 'BK-1101', title: 'The Republic', author: 'Plato', year: -375, publisher: 'Penguin Classics', pages: 416, callNumber: '184 PLA', rackId: 'R-10', shelf: 2, position: 1, copies: 4, available: 3, description: 'Plato’s dialogue on justice, the ideal state and the philosopher-king.', tags: ['ancient philosophy', 'political theory'] },
  { id: 'BK-1102', title: 'Meditations', author: 'Marcus Aurelius', year: 180, publisher: 'Modern Library', pages: 304, callNumber: '188 MAR', rackId: 'R-10', shelf: 2, position: 4, copies: 3, available: 1, description: 'Personal reflections of the Roman emperor on Stoic philosophy and self-discipline.', tags: ['stoicism', 'ethics'] },

  { id: 'BK-1201', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011, publisher: 'Farrar, Straus and Giroux', pages: 499, callNumber: '153.4 KAH', rackId: 'R-11', shelf: 2, position: 2, copies: 4, available: 0, description: 'Two systems of thought and the cognitive biases that shape our judgements.', tags: ['cognitive psychology', 'behavioural economics'] },
  { id: 'BK-1202', title: 'Psychology', author: 'David G. Myers, C. Nathan DeWall', year: 2018, publisher: 'Worth Publishers', edition: '12th', pages: 816, callNumber: '150 MYE', rackId: 'R-11', shelf: 3, position: 5, copies: 5, available: 4, description: 'A research-driven introduction to the science of behaviour and mental processes.', tags: ['general psychology', 'first year'] },

  { id: 'BK-1301', title: 'Research Methodology: Methods and Techniques', author: 'C. R. Kothari', year: 2019, publisher: 'New Age International', edition: '4th', pages: 432, callNumber: '001.42 KOT', rackId: 'R-12', shelf: 2, position: 1, copies: 6, available: 4, description: 'A practical guide to research design, sampling, data collection and analysis.', tags: ['research', 'thesis'] },
  { id: 'BK-1302', title: 'Concise Oxford English Dictionary', author: 'Oxford Languages', year: 2011, publisher: 'Oxford University Press', edition: '12th', pages: 1728, callNumber: '423 OXF', rackId: 'R-12', shelf: 1, position: 3, copies: 2, available: 2, description: 'Reference only. A comprehensive dictionary of current English.', tags: ['reference only', 'dictionary'] },
]

export function getBook(id: string) {
  return BOOKS.find((b) => b.id.toLowerCase() === id.toLowerCase())
}

export function getRack(id: string) {
  return RACKS.find((r) => r.id.toLowerCase() === id.toLowerCase())
}

export function getFloor(level: number) {
  return FLOORS.find((f) => f.level === level) ?? FLOORS[0]
}

export function booksInRack(rackId: string) {
  return BOOKS.filter((b) => b.rackId === rackId).sort((a, b) => a.shelf - b.shelf || a.position - b.position)
}

export function getLocation(book: Book) {
  const rack = getRack(book.rackId)!
  const floor = getFloor(rack.floor)
  return { rack, floor }
}

export function availabilityOf(book: Book) {
  if (book.tags.includes('reference only')) return { label: 'Reference only', tone: 'accent' as const }
  if (book.available === 0) return { label: 'All copies issued', tone: 'destructive' as const }
  if (book.available <= 1) return { label: `${book.available} copy left`, tone: 'accent' as const }
  return { label: `${book.available} of ${book.copies} available`, tone: 'success' as const }
}

export function getDirections(book: Book) {
  const { rack, floor } = getLocation(book)
  const steps = ['Enter through the main entrance and pass the circulation desk.']
  if (floor.level > 0) steps.push(`Take the central staircase or lift to the ${floor.name}.`)
  steps.push(`Walk to Section ${rack.section} — ${rack.subject} (DDC ${rack.ddcRange}).`)
  steps.push(`Find rack ${rack.id}. The rack number is printed on the end panel of the aisle.`)
  steps.push(`Look at shelf ${book.shelf}, counting from the top.`)
  steps.push(`Count to position ${book.position} from the left and match call number ${book.callNumber}.`)
  return steps
}

export function formatYear(year: number) {
  return year < 0 ? `${Math.abs(year)} BCE` : String(year)
}

export function searchBooks(query: string, subject?: string, onlyAvailable?: boolean) {
  const q = query.trim().toLowerCase()
  return BOOKS.filter((b) => {
    const rack = getRack(b.rackId)!
    if (subject && subject !== 'all' && rack.subject !== subject) return false
    if (onlyAvailable && b.available === 0) return false
    if (!q) return true
    return [b.title, b.author, b.callNumber, b.id, rack.subject, rack.id, ...b.tags].some((f) => f.toLowerCase().includes(q))
  })
}

export function parseScannedCode(raw: string): { type: 'book' | 'rack'; id: string } | null {
  const value = raw.trim()
  const bookMatch = value.match(/BK-\d{4}/i)
  if (bookMatch) return getBook(bookMatch[0]) ? { type: 'book', id: bookMatch[0].toUpperCase() } : null
  const rackMatch = value.match(/R-\d{2}/i)
  if (rackMatch) return getRack(rackMatch[0]) ? { type: 'rack', id: rackMatch[0].toUpperCase() } : null
  return null
}
