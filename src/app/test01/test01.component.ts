import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-test01',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './test01.component.html',
  styleUrl: './test01.component.css'
})
export class Test01Component implements OnInit, AfterViewInit {
  appointmentFormVisible = false;
  
  // Sample data for treatments
  treatments = [
    {
      icon: 'fas fa-teeth',
      title: 'General Dentistry',
      description: 'Comprehensive dental checkups, cleanings, and preventive care to maintain your oral health.'
    },
    {
      icon: 'fas fa-tooth',
      title: 'Cosmetic Dentistry',
      description: 'Enhance your smile with teeth whitening, veneers, and other cosmetic procedures.'
    },
    {
      icon: 'fas fa-tools',
      title: 'Restorative Dentistry',
      description: 'Repair damaged teeth with fillings, crowns, bridges, and dental implants.'
    },
    {
      icon: 'fas fa-teeth-open',
      title: 'Orthodontics',
      description: 'Straighten misaligned teeth with braces, clear aligners, and other orthodontic treatments.'
    },
    {
      icon: 'fas fa-procedures',
      title: 'Oral Surgery',
      description: 'Expert surgical procedures including tooth extractions and wisdom teeth removal.'
    },
    {
      icon: 'fas fa-child',
      title: 'Pediatric Dentistry',
      description: 'Specialized dental care for children in a comfortable and friendly environment.'
    }
  ];
  
  // Sample data for technologies
  technologies = [
    {
      image: 'assets/digital-xray.jpg',
      title: 'Digital X-Ray Technology',
      description: 'Advanced digital imaging with lower radiation exposure for precise diagnosis.'
    },
    {
      image: 'assets/cad-cam.jpg',
      title: 'CAD/CAM Technology',
      description: 'Computer-aided design and manufacturing for same-day crowns and restorations.'
    },
    {
      image: 'assets/laser-dentistry.jpg',
      title: 'Laser Dentistry',
      description: 'Minimally invasive treatments with faster healing and increased comfort.'
    },
    {
      image: 'assets/3d-scanner.jpg',
      title: '3D Intraoral Scanner',
      description: 'Digital impressions without messy traditional materials for enhanced patient comfort.'
    }
  ];
  
  // Sample reviews data
  reviews = [
    {
      name: 'Maria Rodriguez',
      date: 'April 15, 2023',
      text: 'Clínica Boccio has transformed my dental experience. The staff is incredibly friendly, and Dr. Boccio takes the time to explain every procedure. My teeth have never looked better!'
    },
    {
      name: 'John Smith',
      date: 'March 3, 2023',
      text: 'I was terrified of dentists until I found Clínica Boccio. Their gentle approach and state-of-the-art technology made my root canal practically painless. Highly recommended!'
    },
    {
      name: 'Sarah Johnson',
      date: 'February 22, 2023',
      text: 'The team at Clínica Boccio is exceptional. From the reception to the dental assistants, everyone is professional and caring. My new dental implants look and feel like natural teeth!'
    }
  ];
  
  constructor() {}
  
  ngOnInit() {
    // Initialize any required resources
  }
  
  ngAfterViewInit() {
    // After view is initialized, add smooth scrolling behavior
    this.setupSmoothScrolling();
  }
  
  openAppointmentForm() {
    this.appointmentFormVisible = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  
  closeAppointmentForm() {
    this.appointmentFormVisible = false;
    document.body.style.overflow = ''; // Restore background scrolling
  }
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  submitAppointmentForm(event: Event) {
    event.preventDefault();
    console.log('Appointment form submitted');
    // In a real app, we would send this data to a server
    
    // Show success message
    alert('Thank you for booking your appointment! We will contact you shortly to confirm.');
    this.closeAppointmentForm();
  }
  
  subscribeToNewsletter(event: Event) {
    event.preventDefault();
    console.log('Newsletter subscription submitted');
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset the form
    const form = event.target as HTMLFormElement;
    form.reset();
  }
  
  submitContactForm(event: Event) {
    event.preventDefault();
    console.log('Contact form submitted');
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset the form
    const form = event.target as HTMLFormElement;
    form.reset();
  }
  
  private setupSmoothScrolling() {
    // Add smooth scrolling behavior for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
     
      });
    });
  }
}